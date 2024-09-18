function EmployeeDetails() {
    const ename = "John Doe"
    const designation = "Software Engineer"
    return (
        <>
            <div>
                <h1 className="text-2xl font-medium">Employee Profile</h1>
            </div>
            <div className="p-2 flex flex-col">

                <div className="flex bg-[#F8FAFC] w-[260px] h-[500px] justify-center items-start">
                    <div className="flex flex-col justify-center items-center">
                        <img className="rounded-full" src="./128.png" alt="" />
                        <p className="text-sm font-medium">{ename}</p>
                        <p className="text-sm font-medium">{designation}</p>
                        <hr />
                    </div>
                </div>
              <div>
                P
              </div>
            </div>
        </>

    )
}
export default EmployeeDetails