import React from 'react';

const ApplyApprove = ({ onApprove, itemId }) => {
    const handleApprove = async () => {
        try {
            const isConfirmed = window.confirm("승인하시겠습니까?");
            if (isConfirmed) {
                await onApprove(itemId);
            }
        } catch (error) {
            console.error("승인 중 오류 발생:", error);
            alert("승인 중 오류가 발생했습니다.");
        }
    };

    return (
        <button
            onClick={handleApprove}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            style={{ display: "inline-block", minWidth: "100px" }}
        >
            승인하기
        </button>
    );
};

export default ApplyApprove;