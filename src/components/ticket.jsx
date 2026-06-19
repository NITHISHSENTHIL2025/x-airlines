import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ticket.css";

function Ticket({ ticketData }) {
    const ticketRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Safely extract flight data
    const flightInfo = ticketData?.flight || {};
    const flightname = flightInfo?.airline || "X Airlines";
    const departureTime = flightInfo?.time || "Time TBD";
    const duration = flightInfo?.duration || "Duration TBD";
    
    // Resolve Flight ID and PNR
    const flightNum = flightInfo?.id ? `ARX00${flightInfo.id}` : `ARX${ticketData.flightnumber}`;
    const pnrCode = ticketData.pnr || "PENDING";

    // FEATURE: Download Ticket as High-Res PDF
    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const element = ticketRef.current;
            // Scale 2 ensures the PDF isn't blurry
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
            const imgData = canvas.toDataURL("image/png");

            // Create Landscape A4 PDF
            const pdf = new jsPDF("landscape", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add image to PDF and trigger download
            pdf.addImage(imgData, "PNG", 0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2, pdfWidth, pdfHeight);
            pdf.save(`${ticketData.passengerName.replace(/\s+/g, '_')}_BoardingPass_${pnrCode}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to download ticket. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            
            {/* The Ticket Itself (Wrapped in a Ref for the PDF snapshot) */}
            <div className="Ticket" ref={ticketRef}>
                
                {/* LEFT SIDE (Main Boarding Pass) */}
                <div className="ticket-left">
                    <div className="ticketnav">
                        <h1>{flightname} Airlines</h1>
                    </div>

                    <div className="Ticketplane">
                        {/* FEATURE: Live Dynamic QR Code */}
                        <div className="qr-container">
                            <QRCode 
                                value={`PNR: ${pnrCode} | Name: ${ticketData.passengerName} | 
                                Flight: ${flightNum} | Seat: ${ticketData.selectedSeat}`} 
                                size={100} 
                                bgColor="transparent"
                                fgColor="#111827"
                                level="M"
                            />
                        </div>
                        
                        <div className="ticket-body-content">
                            <div className="Tickettravel">
                                <span className="city">{ticketData.departure}</span> 
                                <span className="arrow"> ✈︎ </span> 
                                <span className="city">{ticketData.destination}</span>
                            </div>
                            
                            <div className="Ticketinfo">
                                <div className="info-group">
                                    <span className="label">Departure</span>
                                    <span className="value">{departureTime}</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">Duration</span>
                                    <span className="value">{duration}</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">Gate</span>
                                    <span className="value">G-08</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">Flight</span>
                                    <span className="value">{flightNum}</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">Seat</span>
                                    <span className="value highlight">{ticketData.selectedSeat}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (Tear-off Stub) */}
                <div className="ticket-right">
                    <div className="tickednav">
                        <h1>Pass</h1>
                    </div>

                    <div className="Ticketdetails">
                        <ul>
                            <li>
                                <span className="list-label">Name</span>
                                <span className="list-value">{ticketData.passengerName}</span>
                            </li>
                            <li>
                                <span className="list-label">Date</span>
                                <span className="list-value">{ticketData.date}</span>
                            </li>
                            <li>
                                <span className="list-label">Seat</span>
                                <span className="list-value">{ticketData.selectedSeat}</span>
                            </li>
                            <li>
                                <span className="list-label">Total</span>
                                <span className="list-value">₹{ticketData.totalAmount}</span>
                            </li>
                            {ticketData.pnr && (
                                <li>
                                    <span className="list-label">PNR</span>
                                    <span className="list-value">{ticketData.pnr}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* DOWNLOAD BUTTON (Sits outside the ticket so it doesn't get printed on the PDF) */}
            <button 
                onClick={handleDownload} 
                disabled={isDownloading}
                style={{
                    padding: "14px 28px",
                    background: "#111827",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: isDownloading ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s ease"
                }}
            >
                {isDownloading ? "Generating PDF..." : "📥 Download Boarding Pass"}
            </button>

        </div>
    );
}

export default Ticket;