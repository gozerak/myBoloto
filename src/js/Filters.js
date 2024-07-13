import "../css/Filters.css"


function Sortby () {
    return (
        <div>
        <p className="filters-names">Сортировать</p>
        <select className="dropdown-select" id="sortby">
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
        <div>
        <p className="filters-names">Стоимость заказа</p>
        <input type="number" className="input-cost"/>
        </div>
    )
}

function OtherFilters ({title}) {
    return (
        <div className="other-filters">
        <p className="filters-names">{title}</p>
        <select className="dropdown-select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        </div>
    )
}

function TotalFoundButton () {
 return (
    <div className="total-found-block">
    <button className="total-found-button">Показать 16 заказов</button>
    </div>
 )
}


export default function Filters () {
    return (
        <div className="filters">
            <div className="filters-header">
        <p className="filters-name" id="filter-hdr">Фильтры</p>
        <button className="undo-btn">Сбросить</button>
        </div>
        <Sortby />
        <Date />
        <Cost />
        <OtherFilters title="Вид деятельности"/>
        <OtherFilters title="Регион"/>
        <OtherFilters title="Город"/>
        <OtherFilters title="Организация"/>
        <TotalFoundButton />
        </div>
    )

}