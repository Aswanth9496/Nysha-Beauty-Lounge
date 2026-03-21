const Header = require('../models/Header');

exports.addHeader = async (data) => {
  // If you only want one header configuration active at a time, you might optionally deactivate others here.
  // For standard CRUD, we just create.
  return await Header.create(data);
};

exports.getHeaders = async () => {
  // Returns all headers (could be filtered by isActive if needed)
  return await Header.find();
};

exports.getHeaderById = async (id) => {
  const header = await Header.findById(id);
  if (!header) {
    throw new Error('Header configuration not found');
  }
  return header;
};

exports.editHeader = async (id, data) => {
  const header = await Header.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!header) {
    throw new Error('Header configuration not found');
  }
  return header;
};

exports.deleteHeader = async (id) => {
  // Hard delete or you can add an isDeleted flag to the schema if soft delete is preferred
  const header = await Header.findByIdAndDelete(id);
  if (!header) {
    throw new Error('Header configuration not found');
  }
  return header;
};
