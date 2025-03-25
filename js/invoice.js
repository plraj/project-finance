
function addItem() {
    const table = document.getElementById("invoiceItems");
    const row = table.insertRow();
    
    row.innerHTML = `
        <td><input type="text" placeholder="Item Description">
        </td>
        <td><input type="number" value="0" step="0.01" oninput="calculateTotal()"></td>
        <td><input type="number" value="1" oninput="calculateTotal()"></td>
        <td class="amount">₹0.00</td>
    `;
}

function calculateTotal() {
    let total = 0;
    const rows = document.querySelectorAll("#invoiceItems tr");
    const taxperct = document.querySelector('#taxpercentage').value;

    rows.forEach(row => {
        const rate = row.cells[1].querySelector("input").value;
        const qty = row.cells[2].querySelector("input").value;
        const amount = rate * qty;
        const tax = amount*taxperct/100;
        
        totalamount = amount + tax;
        row.cells[3].innerText = `₹${amount.toFixed(2)}`;
        total += totalamount;
    });

    document.getElementById("subtotal").innerText = total.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
    document.getElementById("balanceDue").innerText = total.toFixed(2);
}


function generateinvoice() {

    let invoiceNumber = document.querySelector("input[value^='INV']").value;
    let date = document.querySelector("input[type='date']").value;
    let items = document.querySelector("select").value;


    let positionname = document.querySelector(".positionname").value;

    let logoInput = document.querySelector("#logoUpload");
    let logo = logoInput.files.length > 0 ? URL.createObjectURL(logoInput.files[0]) : "";

    let signatureInput = document.querySelector("#signatureupload");
    let signature = signatureInput.files.length > 0 ? URL.createObjectURL(signatureInput.files[0]) : "";

    let bankname = document.querySelector(".bankname").value;
    let accountname = document.querySelector(".accountname").value;
    let accountnumber = document.querySelector(".accountnumber").value;
    let upiid = document.querySelector(".upiid").value;
    let fromDetails = getDetails(".from-section");
    let billToDetails = getDetails(".bill-section");

    let itemsList = [];
    document.querySelectorAll("#invoiceItems tr").forEach(row => {
        let desc = row.cells[0].querySelector("input").value;
        let rate = parseFloat(row.cells[1].querySelector("input").value) || 0;
        let qty = parseInt(row.cells[2].querySelector("input").value) || 1;
        let amount = rate * qty;

        itemsList.push({ desc, rate, qty, amount });
    });

    let subtotal = parseFloat(document.getElementById("subtotal").innerText);
    let total = parseFloat(document.getElementById("total").innerText);
    let balanceDue = parseFloat(document.getElementById("balanceDue").innerText);

    let notes = document.querySelector(".notes textarea").value;

    // Generate Invoice HTML
    let invoiceHTML = `
        <html>
            <head>
                <title>Invoice ${invoiceNumber}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h2{
                        text-align: center;
                        font-size: 30px;
                    }
                    .company_logo{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        border-bottom: 2px solid grey;
                    }
                    .container{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                    }
                    .invoiceditl > div{
                        display: flex;
                        justify-content: space-between;
                        gap: 10px;
                    }
                    h3, p{
                        margin: 8px;
                    }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    /* th { border: 1px solid black; padding: 8px; text-align: center; } */
                    th{
                        border-top: 2px solid grey;
                        padding: 15px 8px;
                        text-align: center;
                        border-bottom: 2px solid grey;
                    }
                    tr td:first-child{
                        width: 40%;
                    }
                    td:first-child{
                        text-align: left;
                        padding-left: 10px;
                    }
                    td{
                        text-align: center;
                        padding: 12px 5px;
                    }
                    tbody{
                        
                        border-bottom: 2px solid grey;
                    }
                    .totals{
                        text-align: right;
                        justify-items: right;
                    }
                    .totals > div{
                        display: flex;
                        gap: 10px;
                        margin-right: 28px;
                    }
                    .bankdtls p {
                        margin-left: 0px;
                    }
                    .fotdtls{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .signature{
                        margin-top: 20px;
                        text-align: center;
                    }
                    .sign{
                        display: contents;

                    }
                    .notes{
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    .notes h3{
                        margin-left:0px ;
                        margin-top: 20px; 
                    }
                    
                </style>
            </head>
            <body>
                <h2>Invoice</h2>

                <div class="company_logo">
                    <div class="logo">
                        <img src="${logo}" alt="">
                    </div>
                    <div class="company_ditls">
                        <p>${billToDetails}</p>
                    </div>
                </div>
                <div class="container">
                    <div class="issuedto">
                        <h3>ISSUED TO :</h3>

                        <div class="issued_ditls">
                            <p>${billToDetails}</p>
                        </div>
                    </div>
                    <div class="invoiceditl">
                        <div class="invoicenoo">
                            <h3>INVOICE NO : </h3>
                            <h3> ${invoiceNumber} </h3>
                        </div>
                        <div class="invoicedate">
                            <div>
                                <p>Date : </p>
                            </div>
                            <div>
                                <p>${date} </p>
                            </div>
                        </div>
                        <div class="invoiceitemtype">
                            <p>Items : </p>
                            <p>${items} </p>
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsList.map(item => `
                            <tr>
                                <td>${item.desc}</td>
                                <td>₹${item.rate.toFixed(2)}</td>
                                <td>${item.qty}</td>
                                <td>₹${item.amount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                
                <div class="totals">
                    <div class="subtotals">
                        <p>Subtotal</p>
                        <p>₹${subtotal.toFixed(2)}</p>
                    </div>
                    <div class="totalstax">
                        <p>Tax</p>
                        <p>15 %</p>
                    </div>
                    <div class="totalsss">
                        <p>Total</p>
                        <p>₹${total.toFixed(2)}</p>
                    </div>
                </div>

                <div class="fotdtls">

                    <div class="bankdtls">
                        <h2>BANK DETAILS</h2>
                        <P>Bank Name: ${bankname}</P>
                        <P>Account Name: ${accountname}</P>
                        <P>Account No. : ${accountnumber}</P>
                        <P>UPI Id. : ${upiid}</P>
                    </div>

                    <div class="signature">
                        <div class="sign">
                            <img src="${signature}" alt="">
                        </div>
                        <p>${positionname}</p>
                    </div>

                    
                </div>
                <div class="notes">
                    <h3>Notes:</h3>
                    <p>${notes}</p>
                </div>
            </body>
        </html>
    `;

    // Open a new tab with the invoice
    let invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.open();
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    // invoiceWindow.print();

    // Wait for images to load before printing
    let images = invoiceWindow.document.images;
    let loadedImagesCount = 0;

    if (images.length > 0) {
        for (let img of images) {
            img.onload = function () {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    invoiceWindow.print(); // Print after all images are loaded
                }
            };
        }
    } else {
        invoiceWindow.print(); // If no images, print immediately
    }

}

// Helper function to get details from a section
function getDetails(selector) {
    let section = document.querySelector(selector);
    let details = Array.from(section.querySelectorAll("input")).map(input => input.value).filter(val => val).join("<br>");
    return details;
}