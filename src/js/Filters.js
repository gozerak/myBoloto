
import "../css/Filters.css";
import { useFetchOnFocus } from '../hooks/useFetchOnFocus';
import { fetchActionTypes, fetchPlaces, fetchOrganizations } from '../services/apiService';


function Sortby () {
    return (
        <div>
        <p className="sort-name">Сортировать</p>
        <select className="dropdown-select" id="sortby" defaultValue={null}>
            <option hidden value=""></option>
            <option>По дате</option>
            <option>По стоимости</option>
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
        <input type="number" onWheel={(e) => e.target.blur()}  className="input-cost" placeholder="Цена от"/>
        <div className="dash">-</div>
        <input type="number" onWheel={(e) => e.target.blur()}  className="input-cost" placeholder="до"/>
        <p className="ruble">₽</p>
        </div>
        </div>
    )
}

    export function OtherFilters ({title, handleFocus, items, onChange, value, name }) {
        
        // function handleChange (event) {
        //     setSelectedValue(event.target.value);
        // }


    return (
        <div className="other-filters">
        <p className="filters-names">{title}</p>
        <select 
                className={`dropdown-select ${value ? 'active' : ''}`} 
                onChange={onChange}
                value={value}
                onFocus={handleFocus}
            >
        <option className="selected-disabled" hidden value=""></option>
            {items.map(item => (
                    <option className="select-filters" name={name} key={item.id} value={item.id}>{item.title}</option>
                ))}
        </select>
        </div>
    )
}

function TotalFoundButton ({totalOrders}) {
 return (
    <div className="total-found-block">
    <button className="total-found-button">Показать {totalOrders} заказов</button>
    </div>
 )
}


export default function Filters () {
    const [actionTypes, handleActionTypeFocus] = useFetchOnFocus(fetchActionTypes);
    const [places, handlePlaceFocus] = useFetchOnFocus(fetchPlaces);
    const [organizations, handleOrganizationFocus] = useFetchOnFocus(fetchOrganizations);

    return (
        <div className="filters">
        <Sortby />
        <Date />
        <Cost />
        <OtherFilters title="Вид деятельности" handleFocus ={handleActionTypeFocus} items={actionTypes}/>
        <OtherFilters title="Город" handleFocus ={handlePlaceFocus} items={places}/>
        <OtherFilters title="Организация" handleFocus ={handleOrganizationFocus} items={organizations}/>
        <TotalFoundButton totalOrders={5}/>
        </div>
    )

}