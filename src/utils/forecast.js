
const request=require('request')
 
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=5d85af4ae12b418b721f1ceee1a8e16b&units=imperial'

  request({url:url,json:true},(error,{body})=>{
    if(error){
       callback('unable to connect to weather service',undefined)
       }
    else if(body.error){
  callback("unable to find location ",undefined)
    }
else{
        callback(undefined,"it's currently "+body.main.temp +" degree out.It is "+ body.weather[0].description+" weather.")
    }
  })
}

module.exports=forecast;