module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    };

    if (query.keyword) {
        objectSearch.keyword = query.keyword;

        // Tạo một biểu thức chính quy từ keyword để tìm kiếm mà không phân biệt chữ hoa, chữ thường
        const regex = new RegExp(objectSearch.keyword, "i");

        // Gán biểu thức chính quy vào objectSearch
        objectSearch.regex = regex;
    }
    
    return objectSearch; // Trả về đối tượng chứa keyword và regex
};
