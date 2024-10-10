export default function () {
    
    if (loading) {
        return (
        <div className="App">
          <Header />
          <Search/>
          <div>Загрузка...</div>;
          </div>
        )
    }

    return (
        <div className="CustomerApp">
            <Header />
            <Search refreshOrder={refreshOrder} />
            <MainCustomerPart jobs={jobs} refreshOrder={refreshOrder} />
            {/* <Footer /> */}
            </div>
    )
}