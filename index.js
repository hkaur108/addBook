let list=[];

class Book{
    constructor(title,author,isbn){
        this.title= title,
        this.author=author,
        this.isbn=isbn
    }
}
        let serialNo=0;


class Storage{
    setStorage(){
        if(list){
        return localStorage.setItem("book",JSON.stringify(list))
        }
    }

    getStorage(){

    const bookData=localStorage.getItem("book");
    if(bookData){
        const books= JSON.parse(bookData)
        return books
    }
    else{
        console.log("No books in storage!")
    }

    }
}

class UI{

    showfields(book){
        const booklist= document.querySelector("#book-list");
        const tableRow= document.createElement("tr")
        serialNo+=1;
        tableRow.innerHTML+=`
            <td>${serialNo}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="cross"><a class="cross">🗑️</a> </td>
        `

        booklist.appendChild(tableRow)
        tableRow.style.cursor="pointer";
    }

    clearfields(){
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";

    }

    
    showMessage(alert,className){
        const message= document.createElement("div");
        const bookForm= document.querySelector("#book-form");
        const parentNode= document.querySelector('.container')

        message.innerHTML=`
        <div class="alert alert-${className}" role="alert">
        ${alert}
        </div>

        `
        parentNode.insertBefore(message,bookForm)

        setTimeout(()=>{
            message.remove()
        },3000)

    }


    deleteRow(target){
        if(target.className==="cross"){
            target.parentElement.parentElement.remove();
        }

    }
    

}


const bookform= document.querySelector("#book-form");


bookform.addEventListener("submit",(e)=>{
    const title= document.querySelector("#title").value;
    const author= document.querySelector("#author").value;
    const isbn= document.querySelector("#isbn").value;
    const book= new Book(title,author,isbn)
    const ui= new UI();
    ui.showfields(book)
    list.push(book)
    const storage= new Storage()
    storage.setStorage(book);
    storage.getStorage()
    ui.clearfields()
    ui.showMessage("Book has been added!✨","success");
    e.preventDefault()
})

const booklist= document.querySelector("#book-list");

booklist.addEventListener("click",(e)=>{
    const ui = new UI();
    ui.deleteRow(e.target);
    ui.showMessage("Book has been removed!👍", "danger");
    e.preventDefault()
})