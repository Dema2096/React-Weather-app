import './forecast.css'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"

const Forecast = ({ data }) => {

    const WEEK_DAYS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

    const dayInAWeek = new Date().getDay()
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))

    return (
        <div className="forecast">
            <label className="title">Pronostico por dia </label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt='weather' className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                                    <label className='day'>
                                        {forecastDays[index]}
                                    </label>
                                    <label className='description'>
                                        {item.weather[0].description}
                                    </label>
                                    <label className='min-max'>
                                        {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='daily-details-grid'>
                                <div className="daily-details-grid-item">
                                    <label>Presión atmosférica:</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humedad:</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Nubes:</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Viento:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Nivel del mar:</label>
                                    <label>{item.main.sea_level} metros</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sensación térmica:</label>
                                    <label>{Math.round(item.main.feels_like)} °C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default Forecast