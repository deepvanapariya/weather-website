
const request =require("request")

const geocode=(address,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=5d85af4ae12b418b721f1ceee1a8e16b&units=imperial'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services ',undefined)
        }
        // else if(response.body.main.length===0){
        //     callback('Unable to find location.try another search',undefined)
        // }
        else{
            callback(undefined,{
                latitude:body.coord.lon,
                longitude:body.coord.lat,
                location:body.name
            })
        }
    })
}
module.exports=geocode;