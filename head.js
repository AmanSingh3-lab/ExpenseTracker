(
    function (){


            const expenses = JSON.parse(localStorage.getItem("expenses") )||[];

            let editIndex = null;


            function saveExpenses (){
                        localStorage.setItem("expenses", JSON.stringify(expenses));


            }

                const editBtnText = document.querySelector(".addExpenses");

            function popUpMsg(text){
                    const msg = document.querySelector(".msg");

                    msg.textContent = text;


                    setTimeout(()=>{
                        msg.textContent = "";
                    },1500)
            }


        // selection of expenses input
            const expensesTitle = document.querySelector(".titleExpenses");
            const amountExpenses = document.querySelector(".amountExpenses");
            const category = document.querySelector("#Category");
            const filterCategory = document.querySelector("#filterCategory");
            const serachInput = document.querySelector(".search");

                function isDuplicate(){
                        return  expenses.some((item)=>{
                            return(
                                item.title.toLowerCase() === expensesTitle.value.toLowerCase()
                                &&
                                item.amount.toString() === amountExpenses.value.toString()
                            )
                        })

                }

   



            function addExpenses (){

                    if(!expensesTitle.value || !amountExpenses.value){
                        popUpMsg("Please Enter a valid Expenses");
                        expensesTitle.value = "";
                            amountExpenses.value = "";
                        return;
                    }


                    if(isDuplicate()){
                        popUpMsg("Item Already Exists");
                        expensesTitle.value = "";
                            amountExpenses.value = "";
                        return;
                    }

                        const expenseValue = {
                            title: expensesTitle.value,
                            amount: amountExpenses.value,
                           
                            category: category.value
                        }

                        if(editIndex !==null){
                        expenses[editIndex] =
                        expenseValue;

                          editIndex = null;
                          editBtnText.textContent = "Add Expenses"
                          
                        }
                        else{
                              expenses.push(expenseValue);
                        }
                          




                            expensesTitle.value = "";
                            amountExpenses.value = "";
                            rednerExpense();
                             calculateTotalAmount();
                             saveExpenses();

            }

                        function rednerExpense(data = expenses){

                            const taskList = document.querySelector(".ExpenseList")
                            taskList.innerHTML = "";
                                    if(data.length === 0){
                                popUpMsg("no match found")
                            }

                         

                            data.forEach((exp, index)=>{

                                const li = document.createElement("li");
                                const textNode = document.createTextNode(`${exp.title} - ₹ ${exp.amount}`);
                                li.classList.add("expense-item")

                                const delBtn = document.createElement("button");
                                const delNode = document.createTextNode("Delete");
                                delBtn.classList.add("delete")

                                const editBtn = document.createElement("button");
                                const editNode = document.createTextNode("Edit");
                                editBtn.classList.add("edit")



                                delBtn.addEventListener("click",()=>{
                                            delBtnIndex(index);
                                })

                                editBtn.addEventListener("click", ()=>{
                                           editBtnIndex(index);
                                })

                              

                                
                                taskList.appendChild(li);
                               
                                
                                 li.appendChild(textNode);
                                li.appendChild(delBtn);
                                li.appendChild(editBtn);
                                delBtn.appendChild(delNode);
                                editBtn.appendChild(editNode);

                            })
                        }
                        rednerExpense();



            const form = document.querySelector(".from").addEventListener("submit", (e)=>{
                 e.preventDefault();
                 addExpenses();
            })




            function delBtnIndex (index){
                expenses.splice(index, 1)
                rednerExpense();
                    calculateTotalAmount();
                    saveExpenses();
            }


                function editBtnIndex(index){

                        const expense = expenses[index]

                    expensesTitle.value = expense.title;
                    amountExpenses.value = expense.amount;
                     calculateTotalAmount();
                     saveExpenses();
                    
                

                    editBtnText.textContent = "Update"
                    editIndex =index;


                };

                     function calculateTotalAmount(){

                       const amountTotal = expenses.reduce((prev, curr)=>{
                                    return prev + Number(curr.amount)
                            },0)

                            const total = document.querySelector(".total");
                            total.textContent = amountTotal;
                            saveExpenses();
                     }
                     calculateTotalAmount();

                     function debounce(fn , delay){
                        let timerId;

                        return function (...args){

                            clearTimeout(timerId);

                            timerId = setTimeout(()=>{
                                 fn.apply(this, args)
                            },delay);
                }
                     };


                     function handleSearchAndFilter(){
                        const serarchItem = serachInput.value.toLowerCase();
                        const selectedCategory = filterCategory.value;

                         let filtered = expenses.filter((expense)=>{
                               const matchesText =  expense.title.toLowerCase().includes(serarchItem);

                                const matchCategory = selectedCategory === "All" ||
                                expense.category === selectedCategory;
                                return matchesText && matchCategory
                         })
                       
                          

                         rednerExpense(filtered);

                     
                     }

                     serachInput.addEventListener("input",debounce(handleSearchAndFilter, 200));
                     filterCategory.addEventListener("change", handleSearchAndFilter);
                    

    }
)();