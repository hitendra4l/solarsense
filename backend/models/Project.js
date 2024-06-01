const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Project = model("Project", ProjectSchema);
module.exports = Project;
