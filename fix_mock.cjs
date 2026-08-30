const fs = require('fs');

let fileContent = fs.readFileSync('src/lib/mockData.ts', 'utf8');

const replacementContents = [
  "`Bởi tôi ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn lắm. Chẳng bao lâu, tôi đã trở thành một chàng dế thanh niên cường tráng. Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ cứng dần và nhọn hoắt...\\n\\nĐây là cuốn sách kể về cuộc hành trình kỳ thú của Dế Mèn, một chàng dế bộc trực nhưng cũng đầy tự kiêu, đã đi qua nhiều vùng đất, kết bạn với nhiều loài vật và học được những bài học quý giá về tình bạn và lòng dũng cảm.`",
  "`Vì sao bầu trời lại màu xanh? Vì sao con người lại buồn ngủ? Vì sao trái đất lại hình cầu? Cuốn sách này sẽ mang đến cho bạn những lời giải đáp thú vị và khoa học nhất cho hàng vạn câu hỏi 'Vì sao' mà các bạn nhỏ thường thắc mắc về thế giới tự nhiên xung quanh.\\n\\nHãy cùng mở từng trang sách và trở thành một nhà bác học nhí nhé!`",
  "`Người lớn thật kỳ lạ. Họ luôn yêu cầu những con số và những lời giải thích cho mọi thứ, nhưng lại chẳng bao giờ hiểu được những điều giản dị và đẹp đẽ nhất.\\n\\nCậu bé với mái tóc vàng rực rỡ đến từ tiểu hành tinh B612 nhỏ bé sẽ kể cho bạn nghe về bông hồng duy nhất của cậu, về con cáo khao khát được thuần hóa, và về chuyến du hành qua các hành tinh kỳ lạ...`",
  "`Vũ trụ bao la chứa đựng muôn vàn bí ẩn. Từ hệ mặt trời của chúng ta đến những thiên hà xa xôi nhất, cuốn Atlas Không Gian này sẽ cung cấp cho bạn những hình ảnh tuyệt đẹp và kiến thức thiên văn học cơ bản nhất.\\n\\nBạn đã sẵn sàng để trở thành một phi hành gia khám phá vũ trụ chưa?`",
  "`Góc sân nho nhỏ mới xây\\nChiều chiều em đứng nơi này em trông\\nThấy trời xanh biếc mênh mông\\nCánh cò trắng muốt bay vòng trước hiên...\\n\\nNhững vần thơ trong veo của Trần Đăng Khoa đưa chúng ta về một miền quê yên ả, nơi có cánh cò, có vầng trăng, có góc sân nhỏ đong đầy kỷ niệm tuổi thơ.`",
  "`Khủng long Bạo Chúa (T-Rex) là một trong những loài ăn thịt lớn nhất từng tồn tại, với hàm răng sắc nhọn và lực cắn khủng khiếp. Trong khi đó, khủng long Cổ Dài (Brachiosaurus) lại hiền hòa ăn lá cây trên cao.\\n\\nCuốn sách này sẽ tái hiện lại kỷ Jura và kỷ Phấn Trắng một cách chân thực nhất qua những thước ảnh và thông tin chi tiết về từng loài khủng long.`",
  "`Trong cuộc sống hàng ngày, các bạn nhỏ sẽ gặp phải rất nhiều tình huống bất ngờ. Làm thế nào để an toàn khi ở nhà một mình? Làm sao để kết bạn mới? Làm thế nào để quản lý thời gian hiệu quả?\\n\\nCuốn sách Kỹ Năng Sống này như một người bạn đồng hành, hướng dẫn các em từng bước nhỏ để tự tin và tự lập hơn mỗi ngày.`",
  "`Zorba, một con mèo mun to đùng mập ú, đã hứa với cô hải âu Kengah đang hấp hối ba điều: sẽ không ăn quả trứng, sẽ chăm lo cho quả trứng nở ra con, và điều khó nhất - dạy cho con hải âu con bay.\\n\\nMột câu chuyện xúc động, hài hước và thấm đẫm ý nghĩa về tình yêu thương vô điều kiện và lòng dũng cảm vượt qua giới hạn bản thân.`",
  "`Ngày xửa ngày xưa, ở một vương quốc nọ, có một vị vua và một hoàng hậu...\\n\\nNhững câu chuyện cổ tích quen thuộc của Andersen như Cô Bé Bán Diêm, Nàng Tiên Cá, Vịt Con Xấu Xí... luôn mang theo những thông điệp nhân văn sâu sắc, nuôi dưỡng lòng trắc ẩn và trí tưởng tượng phong phú của bao thế hệ trẻ thơ.`",
  "`Lịch sử nước nhà trải dài hàng ngàn năm với bao trang sử hào hùng. Từ thời Hùng Vương dựng nước đến những cuộc khởi nghĩa chống giặc ngoại xâm của Hai Bà Trưng, Ngô Quyền, Trần Hưng Đạo...\\n\\nCuốn truyện tranh lịch sử này sẽ giúp các em học sinh tiếp cận lịch sử Việt Nam một cách sinh động, dễ nhớ và đầy tự hào.`",
  "`Làm thế nào để tạo ra một chiếc núi lửa bằng baking soda? Nước kết tinh thành đá như thế nào? Tại sao nam châm lại hút sắt?\\n\\nCuốn sách tập hợp 101 thí nghiệm khoa học vui nhộn, dễ thực hiện ngay tại nhà với những vật liệu đơn giản. Đây là cơ hội tuyệt vời để các em vừa học vừa chơi, khơi dậy niềm đam mê khoa học.`",
  "`Totto-chan là một cô bé hiếu động, thường bị coi là 'đứa trẻ hư' ở trường cũ. Nhưng khi chuyển đến trường Tomoe, một ngôi trường đặc biệt với những lớp học làm từ toa tàu cũ, cô bé đã được là chính mình.\\n\\nThầy hiệu trưởng Kobayashi đã lắng nghe Totto-chan suốt 4 tiếng đồng hồ, và từ đó, một cuộc sống học đường tuyệt vời đã mở ra...`",
  "`Trong kho tàng văn học dân gian Việt Nam, truyện cổ tích luôn chiếm một vị trí quan trọng. Sọ Dừa tuy dị dạng nhưng lại tài giỏi và hiếu thảo; Tấm hiền lành vất vả cuối cùng cũng được làm hoàng hậu; Thạch Sanh dũng cảm diệt chằn tinh cứu công chúa...\\n\\nNhững câu chuyện răn dạy con người sống hướng thiện, ở hiền gặp lành.`",
  "`Đuối nước là một trong những tai nạn thương tích phổ biến ở trẻ em. Cuốn cẩm nang này cung cấp những kiến thức quan trọng nhất: Nhận biết vùng nước nguy hiểm, cách xử lý khi bị chuột rút, cách sơ cứu người bị đuối nước...\\n\\nTrang bị kiến thức là cách tốt nhất để bảo vệ bản thân và những người xung quanh.`",
  "`Thế giới đã được định hình bởi những bộ óc vĩ đại. Từ Thomas Edison với phát minh bóng đèn điện, Albert Einstein với thuyết tương đối, đến Marie Curie với những cống hiến cho hóa học và vật lý.\\n\\nTìm hiểu về cuộc đời và sự nghiệp của các danh nhân thế giới sẽ truyền cảm hứng mạnh mẽ cho thế hệ trẻ vững bước tương lai.`"
];

let baseBookRegex = /(id:\s*'\d+',[\s\S]*?content:\s*)sampleContent/g;
let matchIndex = 0;

fileContent = fileContent.replace(baseBookRegex, (match, p1) => {
  const replacement = replacementContents[matchIndex] || '`Nội dung đang được cập nhật...`';
  matchIndex++;
  return p1 + replacement;
});

fs.writeFileSync('src/lib/mockData.ts', fileContent);
