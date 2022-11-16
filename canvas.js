let curr_temp
let curr_short_forecast

let user
let sleep
let exercise
let news_result1
let news_result2
let news_result3
async function get_temp(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    curr_temp = json.properties.periods[0].temperature
    curr_short_forecast = json.properties.periods[0].shortForecast
    console.log(json)
}
async function get_news(){
    const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_13512fc6328f6e3ccc262271610700b78c43d&country=au,ca')
    const json = await response.json()
    news_result1 = json.results[0].title
    news_result2 = json.results[1].title
    news_result3 = json.results[2].title
}
function setup() {
    background(50);
    var canvas = createCanvas(600, 700);
    canvas.parent('blank_canvas');
    background(255,255,255)
    news = loadImage('./assets/news.png')
    bg = loadImage('./assets/background.jpg')
    white = loadImage('./assets/white.png')
    calendar = loadImage('./assets/calendar.png')
    get_temp()
    get_news()
}
function draw(){
    image(bg, 0,0,600,700)
    tint(255,70)
    weatherAndTime()
    image(white, 460,500,150,900);
    image(white, 0,470,230,900);
    news_write()
    //image(news, 105,10,375,150)
    image(calendar, 485,10)
    to_do_list()
    tint(255,255)
    sleep_exercise()
}
function news_write(){
    textSize(12)
    text("Top 3 Stories", 250, 10)
    text("1: " + news_result1,130,30)
    text("2: " + news_result2,130,45)
    text("3: " + news_result3,130,60)
}
function sleep_exercise(){
    fill(0)
    sleep = [6,8,7,10,8,7,7]
    exercise = [2,2,1,1,2,0,0]
    text("Sleep:", 10, 500)
    text("Exercise:", 10, 560)
    text("User: Christian", 10, 650)
    x = 60
    for(i = 0; i <= sleep.length -1; i++){
        textSize(15)
        height = sleep[i] * 2
        rect(x,485,10,height)
        height = exercise[i] * 10
        rect(x +20,560,10,height)
        textSize(12)
        text(sleep[i] + "h",x-5,520)
        text(exercise[i] + "h",x+15,600)
        x += 20
    }
}
function to_do_list(){
    y = 520;
    let to_do_list = ["Feed the dog","Go to the gym","do homework"]
    tint(255,50);
    text("To Do List" , 500,520);
    line(500,530,570,530)
    for(i=0; i <= to_do_list.length; i++){
        y += 30;
        text(to_do_list[i], 490,y)
    }
}

function weatherAndTime(){
    var d = new Date().toLocaleDateString()
    var mirror_time = new Date()
    textSize(15)
    // to add date and time to canvas
    textAlign(LEFT, CENTER)
    text(d,10,15)
    //to add weather to canvas
    textSize(20)
    fill(0)
    textAlign(LEFT, CENTER)
    textSize(15)
    text(String(curr_temp) + " Degrees", 10, 45)
    fill(0)
    textAlign(LEFT, CENTER)
    text(String(curr_short_forecast), 10, 30)
    if(mirror_time.getHours() > 12){
        mirror_time_hours = mirror_time.getHours() - 12
    }
    else{
        mirror_time_hours = mirror_time.getHours()
    }
    text(String(mirror_time_hours) + ":" + String(mirror_time.getMinutes()), 10,60)
}

