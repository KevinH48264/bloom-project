const mongoose = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
      {
        name: String,
        email: String,
        username: String,
        password: String,
        role: String,
        pfp: Buffer, 
        comments: [{from: String, to: String, time: String, Content: String}],
      },
        { timestamps: true }
    );
    // convert _id field to id for JSON to pass to frontend
    schema.method("TOJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })
    const User = mongoose.model("users", schema);
    return User;  
};