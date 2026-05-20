export function createResponse (success, message, data = undefined) {
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
//     message: "... fetched successfully",
//     data: [...] 
//    }

    // invalid:
//    {
//     success: false,
//     message: "Failed to fetch ..." 
//    }
}