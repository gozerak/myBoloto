function Respond () {
    return (
        <button className="respond-btn">Откликнуться</button>
    )
}

export default function OrderDetails ({order}) {
    return (
        <>
        <p className="card-header">{order.title}</p>
        <p className="card-cost">{order.price} ₽</p>
        <p className="card-main-info">{order.description}</p>
        <p className="card-main-info">Период: {new Date(order.finished_at).toLocaleDateString()}</p>
        <p className="card-main-info">Вид деятельности: {order.actionTypeName}</p>
        <p className="card-main-info">Место выполнения: {order.place}</p>
        <hr className="hr-line"/>
        <div className="card-employer-container">
                <p className="card-employer">Организация</p>
                <Respond />
            </div>
        </>
    )
}