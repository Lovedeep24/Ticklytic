import mongoose, { mongo } from "mongoose";

const clusterSchema=new mongoose.Schema({
    clusterName:
    {
        type: String,
        required: [true, "You must add a cluster name"]
    },
    duration:
    {
        type: number,
        required: [true, "You must give test duration"]
    },
    tests:
    {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Tests'}],
        required: [true, "You must add tests to the cluster"]
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});


const testCluster = mongoose.model('testCluster', clusterSchema);
module.exports = testCluster;