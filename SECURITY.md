# Security Policy

## Reporting a Security Issue

If you discover a security vulnerability in this repository, please report it by following these steps:

1. **Do NOT disclose the vulnerability publicly**
2. Send a detailed report to goshva via GitHub private message or email
3. Include the following information:
   - Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
   - Full paths of source file(s) related to the manifestation of the issue
   - The location of the affected source code (tag/branch/commit or direct URL)
   - Any special configuration required to reproduce the issue
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

## Preferred Languages

We prefer all communications to be in English.

## Security Update Policy

Security updates will be released as follows:

1. The security team will acknowledge receipt within 3 working days
2. We will confirm the vulnerability and determine its impact
3. We will release a fix as soon as possible depending on complexity
4. We will notify users via:
   - GitHub Security Advisories
   - Release notes
   - Direct notification to affected users if possible

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < latest| :x:                |

## Security Measures

This repository implements the following security measures:

- Automated vulnerability scanning
- Weekly security updates
- CodeQL analysis
- Dependency scanning
- HTTPS enforcement
- Branch protection rules

## Best Practices

When contributing to this repository:

1. Keep all dependencies up to date
2. Use strong authentication
3. Follow secure coding guidelines
4. Implement input validation
5. Use prepared statements for database queries
6. Implement proper error handling
7. Follow the principle of least privilege

## Past Security Advisories

Security advisories will be listed here when they are published.

## Contact

For any questions about this security policy, please contact goshva via GitHub.

## Acknowledgments

We would like to thank all security researchers and contributors who help keep this project secure.

_Last updated: 2025-05-20_