import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CustomerReport = ({ filteredCustomers }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "No",
            "Customer ID",
            "First Name",
            "Last Name",
            "Age",
            "Gender",
            "Contact No",
            "Email"
        ];
        const tableRows = [];

        // Collect data for the PDF table
        filteredCustomers.forEach((customer, index) => {
            const data = [
                index + 1,
                customer.CusID,
                customer.FirstName,
                customer.LastName,
                customer.Age,
                customer.Gender,
                customer.ContactNo,
                customer.Email
            ];
            tableRows.push(data);
        });

        // Get current date and time
        const now = new Date();
        const date = now.toLocaleDateString(); // Format: MM/DD/YYYY
        const time = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

        // PDF Header
        doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
        doc.text("Salon Management", 105, 15, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
        doc.text("Customer Details Report", 105, 25, { align: "center" });

        doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
        doc.text(`Report Generated Date: ${date} ${time}`, 105, 35, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
        doc.text("Salon Bashi", 105, 45, { align: "center" });

        doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
        doc.line(10, 49, 200, 49);

        // PDF Table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 55,
            styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
            headStyles: {
                fillColor: [44, 62, 80],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230]
            },
            margin: { top: 60 },
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' }, // No
                1: { cellWidth: 21, halign: 'center' }, // Customer ID
                2: { cellWidth: 23, halign: 'center' }, // First Name
                3: { cellWidth: 23, halign: 'center' }, // Last Name
                4: { cellWidth: 15, halign: 'center' }, // Age
                5: { cellWidth: 20, halign: 'center' }, // Gender
                6: { cellWidth: 25, halign: 'center' }, // Fixed width for Contact No
                7: { cellWidth: 'auto' }  // Email
            }
        });

        // Save PDF with date and time in filename
        doc.save(`Customer-Details-Report_${date}_${time}.pdf`);

        // Send email alert to customer manager
        /*const emailSubject = encodeURIComponent('Customer Report Generated');
        const emailBody = encodeURIComponent(`Dear Customer Manager,\n\nThe customer report has been generated.\n\nBest regards,\nYour Company`);
        const emailRecipient = encodeURIComponent('customermanager@gmail.com');
        const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
        
        window.location.href = mailtoLink;*/
    };

    return (
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-pink-800 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200">
            <span 
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-100 rounded-md group-hover:bg-opacity-0" 
                onClick={generatePDF}
            >
                Generate Customer Report
            </span>
        </button>
    );
};

export default CustomerReport;
