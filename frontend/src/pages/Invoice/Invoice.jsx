
const Invoice = () => {
    return (
        <div className="lg:m-3 md:m-4 m-3 border-2 border-black min-h-full">

            <div className="flex justify-between p-1 text-xs font-semibold">
                <div>
                    <table className="table-auto text-left border-collapse">
                        <tr>
                            <td className="font-semibold">UDYAM REG</td>
                            <td><span className="px-1">:</span>NO-GJ-10-0001175</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">GSTIN</td>
                            <td><span className="px-1">:</span>24AALPR4622A1Z1</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">STATE</td>
                            <td><span className="px-1">:</span>Gujarat</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">STATE CODE</td>
                            <td><span className="px-1">:</span>24</td>
                        </tr>
                    </table>
                </div>
                <div className="max-w-80 flex flex-col items-center text-center font-bold">
                    <h1 className="font-extrabold text-lg">YOGESHWAR BRASS INDUSTRIES</h1>
                    <p>AN ISO 9001 : 2015 CERTIFIED COMPANY</p>
                    <p>
                        PLOT NO - 4684, ROAD NO X, G.I.D.C, PHASE - III, DARED,
                        JAMNAGAR</p>
                </div>
            </div>

            <div className="relative border-y-2 border-black uppercase text-xs flex items-center justify-between">
                <p className="absolute inset-0 flex justify-center font-semibold">text invoice</p>
                <p className="ml-auto pr-4 font-normal">original</p>
            </div>

            <div className="grid grid-cols-2 text-sm font-semibold">
                <div className="border-b-2 border-r-2 border-black px-1">
                    <table className="table-auto text-left border-collapse">
                        <tr>
                            <td className="font-semibold">BILL REG</td>
                            <td><span className="px-1">:</span>1 / 2024-2025</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">BILL DATE</td>
                            <td><span className="px-1">:</span>14-10-2024</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">TRANSPORT</td>
                            <td><span className="px-1">:</span>TULSI CARGO</td>
                        </tr>
                    </table>
                </div>
                <div className="border-b-2 border-black px-1">
                    <table className="table-auto text-left border-collapse">
                        <tr>
                            <td className="font-semibold">PLACE OF SUPPLY</td>
                            <td><span className="px-1">:</span></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">VEHICLE NO</td>
                            <td><span className="px-1">:</span></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">LR NO</td>
                            <td><span className="px-1">:</span></td>
                        </tr>
                    </table>

                </div>

                <div className="border-b-2 border-r-2 border-black px-1 font-bold">
                    DETAILS OF RECEIVER / BILLED TO
                </div>
                <div className="border-b-2 border-black px-1 font-bold">
                    DETAILS OF CONSIGNEE / SHIPPED TO
                </div>

                <div className="border-r-2 border-black px-1">
                    <table className="table-auto text-left border-collapse text-xs font-bold">
                        <tr>
                            <td >NAME</td>
                            <td><span className="px-1">:</span>SUMER INTERIORS PVT. LTD</td>
                        </tr>
                        <tr>
                            <td >ADDRESS</td>
                            <td className="font-normal text-xs"><span className="px-1">:</span>Survey No. 79/20, Village Sarnej, Khandiwala Bus Stop, Narmada Cael Road, Halol Highway Road, Vadodara - 390019, Vadodara, Gujarat, India</td>
                        </tr>
                        <tr>
                            <td >STATE</td>
                            <td><span className="px-1">:</span>Gujarat</td>
                        </tr>
                        <tr>
                            <td >STATE CODE</td>
                            <td><span className="px-1">:</span>24</td>
                        </tr>
                        <tr>
                            <td >GSTIN</td>
                            <td><span className="px-1">:</span>24AAPCS9781G1ZP</td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap">BOOK & CONTACT</td>
                            <td><span className="px-1">:</span>7434854177</td>
                        </tr>
                    </table>

                </div>
                <div className="px-2">
                    <table className="table-auto text-left border-collapse">
                        <tr>
                            <td className="font-semibold">STATE</td>
                            <td><span className="px-1">:</span>Gujarat</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">STATE CODE</td>
                            <td><span className="px-1">:</span>24</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">GSTIN</td>
                            <td><span className="px-1">:</span></td>
                        </tr>
                    </table>

                </div>
            </div>

            <div className="text-sm font-semibold">
                <table className="border border-black w-full" style={{ borderTopWidth: "2.5px", borderBottomWidth: "2.5px" }}>
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="border-2 border-black font-bold w-1">Sr No</th>
                            <th className="border-2 border-black font-bold w-96">Particular</th>
                            <th className="border-2 border-black font-bold w-1">HSN Code</th>
                            <th className="border-2 border-black font-bold">UOM</th>
                            <th className="border-2 border-black font-bold">Qty.</th>
                            <th className="border-2 border-black font-bold">Weight</th>
                            <th className="border-2 border-black font-bold">MRP</th>
                            <th className="border-2 border-black font-bold w-1">Disc %</th>
                            <th className="border-2 border-black font-bold">Net Rate</th>
                            <th className="border-2 border-black font-bold">Taxable Rs</th>
                            <th className="border-2 border-black font-bold w-1">GST %</th>
                            <th className="border-2 border-black font-bold w-32">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-2 border-black text-center" >1</td>
                            <td className="border-2 border-black" >ROSE HANDLE - 101 - CIAZ (SSF)</td>
                            <td className="border-2 border-black text-center" >8302</td>
                            <td className="border-2 border-black text-center" >SET</td>
                            <td className="border-2 border-black text-end pe-1" >5</td>
                            <td className="border-2 border-black text-end pe-1" >1.000</td>
                            <td className="border-2 border-black text-end pe-1" >3000.00</td>
                            <td className="border-2 border-black text-end pe-1" >0</td>
                            <td className="border-2 border-black text-end pe-1" >3000.00</td>
                            <td className="border-2 border-black text-end pe-1" >15000.00</td>
                            <td className="border-2 border-black text-end pe-1" >18</td>
                            <td className="border-2 border-black text-end pe-1" >17700.00</td>
                        </tr>
                        {[...Array(24)].map((_, index) => (
                            <tr key={index}>
                                <td className="border-2 border-black text-center">{index + 2}</td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                                <td className="border-2 border-black"></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="border-2 border-black text-start ps-1" colSpan={2} >Total: </td>
                            <td className="border-2 border-black" colSpan={2} ></td>
                            <td className="border-2 border-black text-end pe-1" >5</td>
                            <td className="border-2 border-black text-end pe-1" >1.000</td>
                            <td className="border-2 border-black" colSpan={2} ></td>
                            <td className="border-2 border-black text-end pe-1" >3000.00</td>
                            <td className="border-2 border-black text-end pe-1" >15000.00</td>
                            <td className="border-2 border-black" ></td>
                            <td className="border-2 border-black text-end pe-1" >17700.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-2 text-sm font-semibold">
                <div className="border-b-2 border-r-2 border-black">
                    <div className="border-b-2 border-black text-center">
                        <p>Total Invoice Amount in Words</p>
                        <p>Seventeen Thousand Seven Hundred</p>
                    </div>
                    <div className="border-b-2 border-black text-center">
                        <p>Bank Details</p>
                    </div>
                    <div className="border-b-2 border-black">
                        <table className="table-auto text-left border-collapse text-xs font-bold">
                            <tbody>
                                <tr>
                                    <td>Bank Name</td>
                                    <td><span className="px-1">:</span>PUNJAB NATIONAL BANK</td>
                                </tr>
                                <tr>
                                    <td>Account No</td>
                                    <td><span className="px-1">:</span>4115008700000840</td>
                                </tr>
                                <tr>
                                    <td>IFSC Code</td>
                                    <td><span className="px-1">:</span>Jamnagar</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-around">
                        <div>Due Days: 0 Days</div>
                        <div>Due Date: 14-10-2024</div>
                    </div>
                </div>

                <div className="border-b-2 border-black">
                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>Total Before Tax</div>
                        <div>15000.00</div>
                    </div>
                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>CGST</div>
                        <div>1350.00</div>
                    </div>
                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>SGST</div>
                        <div>1350.00</div>
                    </div>

                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>IGST</div>
                        <div>0.00</div>
                    </div>

                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>Total Tax</div>
                        <div>2700.00</div>
                    </div>

                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>Extra Charges</div>
                        <div>0.00</div>
                    </div>

                    <div className="border-b-2 border-black flex justify-between px-1">
                        <div>Total After Tax</div>
                        <div>17700.00</div>
                    </div>

                    <div className="flex justify-between px-1">
                        <div>GST Payable on Reverse Charge</div>
                        <div>0</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between text-sm font-semibold px-2 py-1">
                <div className="flex gap-6">
                    <div>Terms:</div>
                    <div>
                        <ol className="list-decimal">
                            <li>Payment to be made by A/c Pay Cheque or Draft Only.</li>
                            <li>Interest@ 24% Per annum will be charged after due date.</li>
                            <li>Any complain for the goods should be made within two days.</li>
                            <li>We are not responsible for any loss or damage during transit.</li>
                        </ol>
                    </div>
                </div>
                <div className="flex flex-col justify-between text-center">
                    <p>For, YOGESHWAR BRASS INDUSTRIES</p>
                    <p>Authorised Signatory</p>
                </div>
            </div>

        </div >
    );
}

export default Invoice;
