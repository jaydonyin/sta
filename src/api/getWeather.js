import request from '@/utils/request.js'
export function getWeather({ city }) {
  return request({
    url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
    method: 'get'
  })
}
