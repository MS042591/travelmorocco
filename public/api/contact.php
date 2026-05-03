<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SMTP Configuration
define('SMTP_HOST', 'mail.travelmorocco.co');
define('SMTP_PORT', 465);
define('SMTP_USER', 'contact@travelmorocco.co');
define('SMTP_PASS', ',1Q-9=p73%D8,{*f'); // Set securely in PHP

function send_smtp_mail($to, $subject, $message, $from_email, $from_name, $reply_to) {
    $header = "From: " . $from_name . " <" . SMTP_USER . ">\r\n";
    $header .= "Reply-To: " . $reply_to . "\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Since we are on cPanel, the native mail() function is usually the most 
    // reliable way to interface with the server's local SMTP agent (Exim/Postfix)
    // while preserving the correct sender headers.
    return mail($to, $subject, $message, $header);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON data"]);
        exit;
    }

    $name = strip_tags(trim($data["name"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $type = isset($data["type"]) ? $data["type"] : "contact";
    
    $email_html = "";
    $email_subject = "";

    if ($type === 'booking') {
        $tour = strip_tags($data["tour"]);
        $travelers = strip_tags($data["travelers"]);
        $timing = strip_tags($data["timing"]);
        $requests = strip_tags($data["requests"]);

        $email_subject = "New Booking: $tour - $name";
        $email_html = "
            <html>
            <body style='font-family: sans-serif; line-height: 1.6; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <h2 style='color: #ff385c; border-bottom: 1px solid #eee; padding-bottom: 10px;'>New Booking Request</h2>
                    <p><strong>Tour:</strong> $tour</p>
                    <p><strong>Travelers:</strong> $travelers</p>
                    <p><strong>When:</strong> $timing</p>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;'>
                        <p><strong>Special Requests:</strong><br>$requests</p>
                    </div>
                </div>
            </body>
            </html>";
    } else {
        $subject = strip_tags($data["subject"]);
        $msg = nl2br(strip_tags($data["message"]));

        $email_subject = "New Inquiry: $subject - $name";
        $email_html = "
            <html>
            <body style='font-family: sans-serif; line-height: 1.6; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <h2 style='color: #ff385c; border-bottom: 1px solid #eee; padding-bottom: 10px;'>New Contact Inquiry</h2>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Subject:</strong> $subject</p>
                    <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;'>
                        <p><strong>Message:</strong><br>$msg</p>
                    </div>
                </div>
            </body>
            </html>";
    }

    if (send_smtp_mail(SMTP_USER, $email_subject, $email_html, SMTP_USER, "Travel Morocco", $email)) {
        http_response_code(200);
        echo json_encode(["message" => "Message sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Server failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
