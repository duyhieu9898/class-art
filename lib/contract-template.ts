export interface ContractData {
    logoUrl?: string;
    contractNumber: string;
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    studentName: string;
    studentPhone: string;
    studentEmail: string;
    courseTitle: string;
    startDate: string; // formatted DD/MM/YYYY
    endDate: string; // formatted DD/MM/YYYY
    durationLessons: number;
    lessonMinutes: number;
    originalFee: number;
    voucherCode?: string;
    discountPercent?: number;
    finalFee: number;
    paymentMethod: string;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ");
}

export function generateContractHTML(data: ContractData): string {
    const discountText = data.discountPercent
        ? `<p style="margin: 4px 0;">- Giảm giá voucher (${data.voucherCode || "Voucher"}): <strong>${data.discountPercent}%</strong></p>`
        : "";

    const logoHtml = data.logoUrl
        ? `<div style="text-align: center; margin-bottom: 15px;">
             <img src="${data.logoUrl}" alt="REF Academy Logo" style="height: 55px; object-fit: contain;" />
           </div>`
        : "";

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hợp đồng dịch vụ đào tạo - ${data.studentName}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm 20mm 20mm;
        }
        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 13pt;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        .header h1 {
            font-size: 14pt;
            font-weight: bold;
            margin: 0 0 5px 0;
            text-transform: uppercase;
        }
        .header h2 {
            font-size: 15pt;
            font-weight: bold;
            margin: 0 0 5px 0;
            text-transform: uppercase;
        }
        .header p {
            font-size: 11pt;
            margin: 0;
            font-style: italic;
        }
        .section-title {
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 15px;
            margin-bottom: 8px;
            font-size: 13pt;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        .info-table td {
            padding: 4px 0;
            vertical-align: top;
        }
        .info-table td.label {
            width: 160px;
        }
        .info-table td.colon {
            width: 15px;
        }
        .clause-title {
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        .clause-content {
            text-align: justify;
            margin: 0 0 10px 0;
            text-indent: 0;
        }
        .clause-list {
            margin: 0 0 10px 0;
            padding-left: 20px;
            text-align: justify;
        }
        .clause-list li {
            margin-bottom: 4px;
        }
        .signature-section {
            margin-top: 30px;
            width: 100%;
            page-break-inside: avoid;
        }
        .signature-table {
            width: 100%;
            border-collapse: collapse;
        }
        .signature-table td {
            width: 50%;
            text-align: center;
            vertical-align: top;
            padding-top: 10px;
        }
        .signature-title {
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>

    ${logoHtml}

    <div class="header">
        <h1>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
        <h1 style="font-size: 13pt; text-decoration: underline; margin-bottom: 15px;">Độc lập - Tự do - Hạnh phúc</h1>
        <h2>HỢP ĐỒNG DỊCH VỤ ĐÀO TẠO</h2>
        <p>Số: ${data.contractNumber}</p>
    </div>

    <div class="clause-content" style="font-style: italic; margin-bottom: 15px; text-align: center;">
        Hôm nay, ngày ${data.dateDay} tháng ${data.dateMonth} năm ${data.dateYear}, tại Văn phòng Công ty TNHH REF Academy:
    </div>

    <div class="section-title">Bên A: CÔNG TY TNHH REF ACADEMY (Bên cung cấp dịch vụ)</div>
    <table class="info-table">
        <tr>
            <td class="label">Tên công ty</td>
            <td class="colon">:</td>
            <td><strong>CÔNG TY TNHH REF ACADEMY</strong></td>
        </tr>
        <tr>
            <td class="label">Mã số thuế</td>
            <td class="colon">:</td>
            <td>0402347756</td>
        </tr>
        <tr>
            <td class="label">Địa chỉ</td>
            <td class="colon">:</td>
            <td>Số 35 Nại Nam, Phường Hòa Cường Bắc, Quận Hải Châu, TP. Đà Nẵng, Việt Nam</td>
        </tr>
        <tr>
            <td class="label">Người đại diện</td>
            <td class="colon">:</td>
            <td>Ông <strong>LÊ XUÂN THỊNH</strong></td>
        </tr>
        <tr>
            <td class="label">Chức vụ</td>
            <td class="colon">:</td>
            <td>Giám đốc</td>
        </tr>
        <tr>
            <td class="label">Điện thoại</td>
            <td class="colon">:</td>
            <td>0967 749 311</td>
        </tr>
        <tr>
            <td class="label">Email</td>
            <td class="colon">:</td>
            <td>refacademydn@gmail.com</td>
        </tr>
    </table>

    <div class="section-title">Bên B: HỌC VIÊN (Bên tiếp nhận dịch vụ)</div>
    <table class="info-table">
        <tr>
            <td class="label">Họ và tên</td>
            <td class="colon">:</td>
            <td><strong>${data.studentName}</strong></td>
        </tr>
        <tr>
            <td class="label">Điện thoại</td>
            <td class="colon">:</td>
            <td>${data.studentPhone || "—"}</td>
        </tr>
        <tr>
            <td class="label">Email</td>
            <td class="colon">:</td>
            <td>${data.studentEmail || "—"}</td>
        </tr>
    </table>

    <div class="clause-content" style="margin-top: 15px;">
        Hai Bên cùng thống nhất ký kết Hợp đồng dịch vụ đào tạo với các điều khoản dưới đây:
    </div>

    <div class="clause-title">Điều 1: Đối tượng của hợp đồng</div>
    <div class="clause-content">
        Bên B đăng ký và Bên A đồng ý tiếp nhận đào tạo khóa học với thông tin chi tiết như sau:
    </div>
    <table class="info-table" style="margin-left: 15px; width: calc(100% - 15px);">
        <tr>
            <td style="width: 180px;">Tên khóa học đăng ký</td>
            <td class="colon">:</td>
            <td><strong>${data.courseTitle}</strong></td>
        </tr>
        <tr>
            <td>Thời gian học</td>
            <td class="colon">:</td>
            <td>Từ ngày <strong>${data.startDate}</strong> đến ngày <strong>${data.endDate}</strong></td>
        </tr>
        <tr>
            <td>Thời lượng khóa học</td>
            <td class="colon">:</td>
            <td><strong>${data.durationLessons}</strong> buổi (mỗi buổi <strong>${data.lessonMinutes}</strong> phút)</td>
        </tr>
        <tr>
            <td>Hình thức học</td>
            <td class="colon">:</td>
            <td>Học trực tiếp (Offline) / Trực tuyến (Online) theo thỏa thuận lớp học</td>
        </tr>
        <tr>
            <td>Địa điểm học</td>
            <td class="colon">:</td>
            <td>Số 35 Nại Nam, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng</td>
        </tr>
    </table>

    <div class="clause-title">Điều 2: Học phí và phương thức thanh toán</div>
    <div class="clause-content">
        2.1. Học phí khóa học:<br/>
        <div style="margin-left: 15px; margin-top: 5px;">
            <p style="margin: 4px 0;">- Học phí gốc: <strong>${formatCurrency(data.originalFee)}</strong></p>
            ${discountText}
            <p style="margin: 4px 0;">- Học phí thực tế phải nộp: <span style="font-size: 14pt; color: #000;"><strong>${formatCurrency(data.finalFee)}</strong></span></p>
        </div>
    </div>
    <div class="clause-content">
        2.2. Phương thức thanh toán: <strong>${data.paymentMethod}</strong> (Nộp trước khi khai giảng).
    </div>
    <div class="clause-content">
        2.3. Thông tin tài khoản nhận học phí của Bên A:<br/>
        <div style="margin-left: 15px; margin-top: 5px;">
            Chủ tài khoản: <strong>Lê Xuân Thịnh</strong><br/>
            Số tài khoản: <strong>2960893</strong><br/>
            Ngân hàng: <strong>VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)</strong>
        </div>
    </div>

    <!-- Page Break for clear separation of terms and signatures -->
    <div class="page-break"></div>

    <div class="clause-title">Điều 3: Quyền và nghĩa vụ của Bên A</div>
    <ul class="clause-list">
        <li>Cung cấp đầy đủ chương trình giảng dạy, giáo trình và tài liệu học tập theo đúng nội dung cam kết.</li>
        <li>Bố trí giảng viên có năng lực chuyên môn và kinh nghiệm giảng dạy phù hợp.</li>
        <li>Đảm bảo chất lượng đào tạo, không gian học tập và nền tảng học tập ổn định cho học viên.</li>
        <li>Cấp chứng nhận hoàn thành khóa học cho Bên B sau khi hoàn thành đầy đủ chương trình đào tạo và đạt yêu cầu của khóa học.</li>
        <li>Thông báo trước ít nhất 24 giờ cho Bên B nếu có bất kỳ thay đổi nào liên quan đến lịch học hoặc giảng viên.</li>
    </ul>

    <div class="clause-title">Điều 4: Quyền và nghĩa vụ của Bên B</div>
    <ul class="clause-list">
        <li>Thanh toán đầy đủ và đúng hạn học phí theo quy định tại Điều 2 của Hợp đồng này.</li>
        <li>Tham gia học tập đầy đủ và đúng giờ theo lịch trình thống nhất. Trường hợp nghỉ học phải thông báo trước ít nhất 02 giờ.</li>
        <li>Tuân thủ nội quy học tập, giữ gìn tài sản của Bên A và tôn trọng giảng viên cùng các bạn học viên khác.</li>
        <li>Không sao chép, phát hành hoặc chia sẻ giáo trình và các tài liệu học tập độc quyền của Bên A cho bên thứ ba.</li>
    </ul>

    <div class="clause-title">Điều 5: Chính sách hoàn/hủy khóa học</div>
    <ul class="clause-list">
        <li>Nếu Bên B hủy đăng ký trước ngày khai giảng từ 05 ngày trở lên, Bên A hoàn trả 100% học phí đã đóng.</li>
        <li>Nếu Bên B hủy đăng ký trong vòng 05 ngày trước ngày khai giảng, Bên A hoàn trả 50% học phí đã đóng.</li>
        <li>Nếu Bên B hủy đăng ký sau khi khóa học đã bắt đầu, Bên A sẽ không hoàn trả học phí.</li>
        <li>Trường hợp Bên A không thể tổ chức khóa học, Bên A hoàn trả 100% học phí và thông báo trước ít nhất 03 ngày.</li>
    </ul>

    <div class="clause-title">Điều 6: Cam kết bảo mật thông tin</div>
    <ul class="clause-list">
        <li>Bên A cam kết bảo mật mọi thông tin cá nhân của Bên B, chỉ sử dụng cho mục đích giảng dạy và liên lạc.</li>
        <li>Bên B cam kết không tiết lộ các nội dung bài học, tài liệu độc quyền của Bên A cho bất kỳ bên thứ ba nào.</li>
    </ul>

    <div class="clause-title">Điều 7: Giải quyết tranh chấp</div>
    <ul class="clause-list">
        <li>Mọi tranh chấp phát sinh từ hợp đồng này sẽ được hai bên ưu tiên giải quyết thông qua đàm phán, thương lượng hòa giải.</li>
        <li>Trường hợp thương lượng không thành, tranh chấp sẽ được đưa ra giải quyết tại Tòa án nhân dân có thẩm quyền tại TP. Đà Nẵng.</li>
    </ul>

    <div class="clause-title">Điều 8: Hiệu lực hợp đồng</div>
    <ul class="clause-list">
        <li>Hợp đồng này có hiệu lực kể từ ngày ký và tự động thanh lý khi Bên B hoàn thành khóa học.</li>
        <li>Hợp đồng được lập thành 02 bản, mỗi bên giữ 01 bản và có giá trị pháp lý tương đương nhau.</li>
    </ul>

    <div class="signature-section">
        <table class="signature-table">
            <tr>
                <td>
                    <div class="signature-title">ĐẠI DIỆN BÊN A</div>
                    <div style="font-size: 10pt; font-style: italic; margin-bottom: 65px;">(Ký, ghi rõ họ tên và đóng dấu)</div>
                    <div style="font-weight: bold;">Lê Xuân Thịnh</div>
                </td>
                <td>
                    <div class="signature-title">ĐẠI DIỆN BÊN B</div>
                    <div style="font-size: 10pt; font-style: italic; margin-bottom: 65px;">(Ký và ghi rõ họ tên)</div>
                    <div style="font-weight: bold;">${data.studentName}</div>
                </td>
            </tr>
        </table>
    </div>

</body>
</html>
    `;
}
