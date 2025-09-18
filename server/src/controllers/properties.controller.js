const cloudinary = require("../config/cloudinary");
const Property = require("../models/properties.model");

exports.createProperty = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Function to upload buffer to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "my_uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // Upload all images
    const images = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    // Create property with request body + image URLs
    const property = new Property({
      ...req.body,
      images,
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate("listedBy");
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

exports.getPaginatedProperties = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      statusFilter,
      minPrice,
      maxPrice,
      // sortBy = "createdAt",
      // sortOrder = "desc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (statusFilter) {
      query.status = statusFilter;
    }
    query.isArchived = false;
    // Search across multiple fields
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ];
    }

    // Filters

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Sorting
    // const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Fetch paginated results
    const [properties, total] = await Promise.all([
      Property.find(query)
        // .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("listedBy", "name email"), // Populate listedBy
      Property.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    next(error);
  }
};
exports.getArchivedProperties = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      statusFilter,
      minPrice,
      maxPrice,
      // sortBy = "createdAt",
      // sortOrder = "desc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (statusFilter) {
      query.status = statusFilter;
    }
    query.isArchived = true;
    // Search across multiple fields
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ];
    }

    // Filters

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Sorting
    // const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Fetch paginated results
    const [properties, total] = await Promise.all([
      Property.find(query)
        // .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("listedBy", "name email"), // Populate listedBy
      Property.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    next(error);
  }
};
exports.getPropertyById = async (req, res, next) => {
  try {
    const result = await Property.findById(req.params.propertyId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching property by id:", error);
    next(error);
  }
};
exports.toggleArchiveProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isArchived } = req.body;
    console.log({ isArchived });
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { isArchived: !isArchived },
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property archived successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error archiving property:", error);
    next(error);
  }
};
exports.editProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Start with request body data (excluding images)
    const updateData = { ...req.body };

    let images = [];
    console.log(req.body.existingImages);
    // Handle existing image links
    if (req.body.existingImages) {
      try {
        const existingImages =
          typeof req.body.existingImages === "string"
            ? [req.body.existingImages]
            : req.body.existingImages;

        if (Array.isArray(existingImages)) {
          images = [...existingImages];
        }
      } catch (err) {
        console.warn("Failed to parse existingImages:", err.message);
      }
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const uploadToCloudinary = (fileBuffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "my_uploads" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(fileBuffer);
        });

      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      images = [...images, ...uploadedImages];
    }

    updateData.images = images;

    const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    next(error);
  }
};
