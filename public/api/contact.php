<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SMTP Configuration
define('SMTP_HOST', 'mail.travelmorocco.co');
define('SMTP_PORT', 465);
define('SMTP_USER', 'contact@travelmorocco.co');
define('SMTP_PASS', ',1Q-9=p73%D8,{*f'); 

function send_smtp_mail($to, $subject, $message, $from_email, $from_name, $reply_to) {
    $header = "From: " . $from_name . " <" . SMTP_USER . ">\r\n";
    $header .= "Reply-To: " . $reply_to . "\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-Type: text/html; charset=UTF-8\r\n";
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
    $phone = isset($data["phone"]) ? strip_tags(trim($data["phone"])) : "Not provided";
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
                    <p><strong>Phone:</strong> $phone</p>
                    <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;'>
                        <p><strong>Special Requests:</strong><br>$requests</p>
                    </div>
                </div>
            </body>
            </html>";
    } elseif ($type === 'planner') {
        $vibe = isset($data["vibe"]) ? ucfirst($data["vibe"]) : "Not specified";
        $duration = isset($data["duration"]) ? ucfirst($data["duration"]) : "Not specified";
        $comfort = isset($data["comfort"]) ? ucfirst($data["comfort"]) : "Not specified";
        $wishes = isset($data["wishes"]) ? strip_tags($data["wishes"]) : "None";
        
        $email_subject = "New Bespoke Trip Plan Request - $name";
        $email_html = "
            <html>
            <body style='font-family: sans-serif; line-height: 1.6; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <h2 style='color: #ff385c; border-bottom: 2px solid #ff385c; padding-bottom: 10px;'>✨ New Concierge Request</h2>
                    <p>A new custom journey has been requested with the following preferences:</p>
                    
                    <div style='display: grid; grid-template-cols: 1fr 1fr; gap: 10px; background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;'>
                        <p style='margin: 5px 0;'><strong>Traveler Vibe:</strong> $vibe</p>
                        <p style='margin: 5px 0;'><strong>Desired Duration:</strong> $duration</p>
                        <p style='margin: 5px 0;'><strong>Comfort Level:</strong> $comfort</p>
                    </div>

                    <h3 style='font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px;'>Client Information</h3>
                    <p style='margin: 5px 0;'><strong>Name:</strong> $name</p>
                    <p style='margin: 5px 0;'><strong>Email:</strong> $email</p>
                    <p style='margin: 5px 0;'><strong>Phone:</strong> $phone</p>
                    <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;'>
                        <p><strong>Special Wishes:</strong><br>$wishes</p>
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
                    <p><strong>Phone:</strong> $phone</p>
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
