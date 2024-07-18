function Respond () {
    return (
        <button className="respond-btn">Откликнуться</button>
    )
}

export default function OrderDetails ({order}) {
    console.log(order)
    return (
        <>
        <p className="card-header">{order.title}</p>
        <p className="card-cost">{order.price} ₽</p>
        <p className="card-main-info">{order.description}</p>
        <p className="card-main-info">Период: {new Date(order.started_at).toLocaleDateString()} {order.finished_at? `- ${new Date(order.finished_at).toLocaleDateString()}`: null}</p>
        <p className="card-main-info">Вид деятельности: {order.actionTypeName}</p>
        <p className="card-main-info">Город: {order.place}</p>
        <p className="card-main-info">Адрес: {order.job_address}</p>
        <hr className="hr-line"/>
        <div className="card-employer-container">
                <p className="card-employer">{order.organization}</p>
                <Respond />
            </div>
        </>
    )
}