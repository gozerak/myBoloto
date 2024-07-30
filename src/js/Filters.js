import { useState } from "react"
import "../css/Filters.css"
// import { useJobs } from "./JobContext"


function Sortby () {
    return (
        <div>
        <p className="sort-name">Сортировать</p>
        <select className="dropdown-select" id="sortby" defaultValue={null}>
            <option hidden value=""></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        </div>
    )
}

function Date () {
    return (
        <div>
        <p className="filters-names">Период</p>
        <div className="datetime">
        <input type="date" className="date"/>
        <p className="dash">-</p>
        <input type="date" className="date"/>
        </div>
        </div>
    )
}

function Cost () {
    return (
        <div autoComplete="off">
        <p className="filters-names">Уровень дохода</p>
        <div className="cost-block">
        <input type="number"  className="input-cost" placeholder="Цена от"/>
        <div className="dash">-</div>
        <input type="number"  className="input-cost" placeholder="до"/>
        <p className="ruble">₽</p>
        </div>
        </div>
    )
}

function OtherFilters ({title, options =[]}) {
    const [selectedValue, setSelectedValue] = useState('');

    function handleChange(event) {
        setSelectedValue(event.target.value);
    }

    return (
        <div className="other-filters">
        <p className="filters-names">{title}</p>
        <select 
                className={`dropdown-select ${selectedValue ? 'active' : ''}`} 
                onChange={handleChange}
                value={selectedValue}
            >
        <option className="selected-disabled" hidden value=""></option>
            {/* {options.map(option => (
                    <option className="select-filters" key={option.id} value={option.id}>{option.name}</option>
                ))} */}
        </select>
        </div>
    )
}

function TotalFoundButton ({totalOrders}) {
 return (
    <div className="total-found-block">
    {/* <button className="total-found-button">Показать {totalOrders} заказов</button> */}
    </div>
 )
}


export default function Filters () {
    // const {actionTypes} = useJobs();
    // const {places} = useJobs();
    // const {organizations} = useJobs();
    // const {jobsLength} = useJobs();

    // const actionTypesOptions = Object.entries(actionTypes).map(([id, name]) => ({
    //     id,
    //     name
    // }));

    // const placesOptions = Object.entries(places).map(([id, name]) => ({
    //     id,
    //     name
    // }));

    // const organizationsOptions = Object.entries(organizations).map(([id, name]) => ({
    //     id,
    //     name
    // }));

    return (
        <div className="filters">
        <Sortby />
        <Date />
        <Cost />
        {/* <OtherFilters title="Вид деятельности" options = {actionTypesOptions}/>
        <OtherFilters title="Регион"/>
        <OtherFilters title="Город"  options = {placesOptions}/>
        <OtherFilters title="Организация" options={organizationsOptions}/>
        <TotalFoundButton totalOrders={jobsLength}/> */}
        </div>
    )

}