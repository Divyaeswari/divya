import sequelize from "sequelize";

const test = async (req, res) => {
    return res.status(200).json('Hai');
    // console.log('i');
}

export default test