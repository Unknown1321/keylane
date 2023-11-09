import mongoose from "mongoose";


const ExperiencesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
        type: String,
        required: true,
      },
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Experiences = mongoose.model("Experiences", ExperiencesSchema);

export default Experiences;