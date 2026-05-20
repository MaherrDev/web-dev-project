export function respond (success, message, data = undefined) {
    const resBody = {
        success: success,
        message: message,
    }

    if (data !== undefined) {
        resBody.data = data
    }

    return resBody
    
    // valid request:
//    { 
//     success: true,
//     message: "Books fetched successfully",
//     data: [...] 
//    }

    // invalid:
//    {
//     success: false,
//     message: "Failed to fetch books" 
//    }
}