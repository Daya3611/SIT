// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AgriLoanContract
 * @dev Manages the tokenization of agricultural loans and escrow services for wAG006.
 */
contract AgriLoanContract {
    enum ApplicationStatus { Pending, Approved, Disbursed, Defaulted, Repaid }

    struct LoanApplication {
        uint256 id;
        address farmer;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        ApplicationStatus status;
        uint256 timestamp;
    }

    mapping(uint256 => LoanApplication) public loans;
    uint256 public loanCount;

    event LoanApplied(uint256 indexed loanId, address indexed farmer, uint256 amount);
    event LoanApproved(uint256 indexed loanId);
    event FundsDisbursed(uint256 indexed loanId, uint256 amount);

    function applyForLoan(uint256 _amount, uint256 _duration) external {
        loanCount++;
        loans[loanCount] = LoanApplication({
            id: loanCount,
            farmer: msg.sender,
            amount: _amount,
            interestRate: 4, // 4% flat for KCC simulation
            duration: _duration,
            status: ApplicationStatus.Pending,
            timestamp: block.timestamp
        });

        emit LoanApplied(loanCount, msg.sender, _amount);
    }

    // Only simulated "Bank" or "Admin" would call this in production
    function approveLoan(uint256 _loanId) external {
        require(loans[_loanId].status == ApplicationStatus.Pending, "Not in pending state");
        loans[_loanId].status = ApplicationStatus.Approved;
        emit LoanApproved(_loanId);
    }
}
