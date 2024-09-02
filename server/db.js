const mongoose =require('mongoose')
function connects(){

    mongoose.connect('mongodb://localhost:27017/socio_app')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connects
