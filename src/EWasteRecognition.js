import { useState } from "react";
import "./App.css"; // Import the shared CSS file

function EWasteRecognition() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [ewasteInfo, setEwasteInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyAAFACOYJoC4m0L_dAG4qgBygwpGS9EzQU";
    const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result);
                setImage(reader.result.split(",")[1]);
            };
        }
    };

    const analyzeImage = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const requestBody = {
                requests: [
                    {
                        image: { content: image },
                        features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
                    },
                ],
            };

            const response = await fetch(VISION_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            const labels = data.responses[0]?.labelAnnotations?.map(label => label.description) || ["No e-waste detected"];
            setEwasteInfo(labels);
        } catch (error) {
            console.error("Error analyzing image:", error);
            setEwasteInfo(["Error fetching e-waste data"]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>E-Waste Recognition</h1>

            {/* Upload Section */}
            <div className="upload-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                />

                {/* Image Preview */}
                {preview && (
                    <div className="image-preview">
                        <img
                            src={preview}
                            alt="Uploaded"
                            className="preview-image"
                        />
                    </div>
                )}

                {/* Analyze Button */}
                <button
                    onClick={analyzeImage}
                    disabled={!image || loading}
                    className="analyze-button"
                >
                    {loading ? "Analyzing..." : "Analyze Image"}
                </button>
            </div>

            {/* Results Section */}
            {ewasteInfo && (
                <div className="results-section">
                    <h2>Analysis Results</h2>
                    <ul>
                        {ewasteInfo.map((info, index) => (
                            <li key={index}>
                                <span className="result-label">{info}</span> -{" "}
                                {info.toLowerCase().includes("electronic") || info.toLowerCase().includes("device")
                                    ? "This item is likely e-waste. Please recycle it responsibly."
                                    : "This item may not be e-waste."}
                            </li>
                        ))}
                    </ul>
                    <p className="tip">
                        Tip: Look for local e-waste recycling centers or programs to dispose of your electronic waste properly.
                    </p>
                </div>
            )}
        </div>
    );
}

export default EWasteRecognition;