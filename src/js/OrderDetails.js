function Respond () {
    return (
        <button className="respond-btn">Откликнуться</button>
    )
}

export default function OrderDetails () {
    return (
        <>
        <p className="card-header">Заголовок</p>
        <p className="card-cost">10000 ₽</p>
        <p className="card-main-info">Период:</p>
        <p className="card-main-info">Вид деятельности:</p>
        <p className="card-main-info">Место выполения:</p>
        <p className="card-employer">Работодатель</p>
        <Respond />
        </>
    )
}