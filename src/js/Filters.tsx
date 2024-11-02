import React, { ChangeEvent } from "react";
import "../css/Filters.css";
import { useFetchOnFocus } from '../hooks/useFetchOnFocus';
import { fetchActionTypes, fetchPlaces, fetchOrganizations, Organization } from '../services/apiService';


function Sortby () {
    return (
        <div>
        <p className="sort-name">Сортировать</p>
        <select className="dropdown-select" id="sortby" data-defaultvalue={null}>
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
        <div data-autocomplete="off">
            <p className="filters-names">Уровень дохода</p>
            <div className="cost-block">
                <input type="number" onWheel={(e) => (e.target as HTMLTextAreaElement).blur()}  className="input-cost" placeholder="Цена от"/>
                <div className="dash">-</div>
                <input type="number" onWheel={(e) => (e.target as HTMLTextAreaElement).blur()}  className="input-cost" placeholder="до"/>
                <p className="ruble">₽</p>
            </div>
        </div>
    )
}

    export function OtherFilters ({title, handleFocus, items, onChange, value, name, nameOfClass, nameOfDrop }: {
        title?:string;
        handleFocus: () => void;
        items: Organization[];
        onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
        value?: string;
        name?: string;
        nameOfClass?: string;
        nameOfDrop?: string;
    }) {
        
    return (
        <div className={nameOfClass? nameOfClass : "other-filters"}>
            <p className="filters-names">{title}</p>
            <select 
                    className={`${nameOfDrop? nameOfDrop : 'dropdown-select'} ${value ? 'active' : ''}`} 
                    onChange={e => onChange(e)}
                    value={value}
                    onFocus={handleFocus}
                    name={name}
                >
            <option className="selected-disabled" hidden value=""></option>
                {items.map(item => (
                        <option className="select-filters" data-name={name} key={item.id} value={item.id}>{item.title}</option>
                    ))}
            </select>
        </div>
    )
}

function TotalFoundButton ({totalOrders}: {totalOrders: number}) {
 return (
    <div className="total-found-block">
    <button className="total-found-button">Показать {totalOrders} заказов</button>
    </div>
 )
}

function handleChangeFilterValue(e: React.ChangeEvent) {
    console.log(e)
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
        <OtherFilters title="Вид деятельности" handleFocus ={handleActionTypeFocus} items={actionTypes} onChange={handleChangeFilterValue}/>
        <OtherFilters title="Город" handleFocus ={handlePlaceFocus} items={places} onChange={handleChangeFilterValue}/>
        <OtherFilters title="Организация" handleFocus ={handleOrganizationFocus} items={organizations} onChange={handleChangeFilterValue}/>
        <TotalFoundButton totalOrders={5}/>
        </div>
    )

}