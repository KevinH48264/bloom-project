const mongoose = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
      {
        name: String,
        email: String,
        username: String,
        password: String,
        role: String,
        img: { data: Buffer, contentType: String},
        comments: [{fromId: String, fromName: String, fromRole: String, to: String, time: Date, content: String}],
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