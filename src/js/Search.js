import "../css/Search.css"

export default function Search () {
    return (
        <div className="search-form">
        <form className="search-system">
        <input type="text" placeholder="Type here..." className="search-bar"></input>
        <button type="submit" className="submit">Найти</button>
        </form>
        <p className="total-found">Найдено 16 заказов:</p>
        </div>
    )
}