# import streamlit as st
# from PIL import Image, ImageDraw
# import numpy as np
# from ultralytics import YOLO

# # Load YOLOv8 model
# model = YOLO('yolov8m.pt')  # Load a pretrained YOLOv8 model

# def make_prediction(img):
#     # Predict using the model
#     results = model(img)
#     return results

# def create_image_with_bboxes(img, results):
#     # Copy the image to draw on it
#     img_with_bboxes = img.copy()
#     draw = ImageDraw.Draw(img_with_bboxes)
    
#     # Check if results contain predictions
#     if hasattr(results[0], 'boxes'):
#         # Extract bounding boxes and labels from the results
#         for result in results:
#             boxes = result.boxes.xyxy.cpu().numpy()  # Get bounding boxes
#             confidences = result.boxes.conf.cpu().numpy()  # Get confidence scores
#             classes = result.boxes.cls.cpu().numpy()  # Get class indices

#             for box, conf, cls in zip(boxes, confidences, classes):
#                 x1, y1, x2, y2 = map(int, box)
#                 label = model.names[int(cls)]
#                 # Draw the bounding box and label on the image
#                 draw.rectangle([x1, y1, x2, y2], outline="red", width=2)
#                 draw.text((x1, y1), f'{label} {conf:.2f}', fill="red")
#     else:
#         st.warning("No bounding boxes found.")
    
#     return img_with_bboxes

# # Dashboard
# st.title("Object Detector")
# upload = st.file_uploader(label="Upload Image Here:", type=["png", "jpg", "jpeg"])

# if upload:
#     # Read the uploaded image
#     img = Image.open(upload).convert('RGB')  # Ensure image is in RGB format

#     # Predict the image using the model
#     results = make_prediction(img)

#     # Create image with bounding boxes
#     img_with_bbox = create_image_with_bboxes(img, results)

#     # Display the image with bounding boxes
#     st.image(img_with_bbox, caption='Detected Objects', use_column_width=True)

#     # Display prediction details
#     st.header("Predicted Probabilities")
#     is_ewaste = False
#     if hasattr(results[0], 'boxes'):
#         for result in results:
#             boxes = result.boxes.xyxy.cpu().numpy()
#             confidences = result.boxes.conf.cpu().numpy()
#             classes = result.boxes.cls.cpu().numpy()

#             for box, conf, cls in zip(boxes, confidences, classes):
#                 label = model.names[int(cls)]
#                 if label == 'ewaste' and conf > 0.5:  # Adjust confidence threshold as needed
#                     is_ewaste = True
#                     st.write(f"Class: {label}, Confidence: {conf:.2f}, Box: [{box}]")
    
#     if is_ewaste:
#         st.error("The image is not identified as e-waste.")
#     else:
#         st.success("The image is identified as e-waste.")
# import io
# from PIL import Image
# from ultralytics import YOLO

# # Load YOLOv8 model
# model = YOLO('yolov8m.pt')  

# def is_ewaste(image_bytes):
#     img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
#     results = model(img)
    
#     for result in results:
#         if hasattr(result, 'boxes'):
#             boxes = result.boxes.xyxy.cpu().numpy()
#             confidences = result.boxes.conf.cpu().numpy()
#             classes = result.boxes.cls.cpu().numpy()

#             for box, conf, cls in zip(boxes, confidences, classes):
#                 label = model.names[int(cls)]
#                 if label == 'ewaste' and conf > 0.5:
#                     return True  # Detected as e-waste
#     return False  # Not detected as e-waste

import io
import logging
from PIL import Image
from ultralytics import YOLO

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load YOLOv8 model
model = YOLO('yolov8m.pt')

# Define a list of e-product categories
E_PRODUCT_CATEGORIES = [
    'cell phone', 'tv', 'laptop', 'speakers', 'computer', 'tablet', 'camera', 'monitor'
]

def is_ewaste(image_bytes):
    
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    results = model(img)

    detected_e_product = False

    for result in results:
        if hasattr(result, 'boxes'):
            boxes = result.boxes.xyxy.cpu().numpy()
            confidences = result.boxes.conf.cpu().numpy()
            classes = result.boxes.cls.cpu().numpy()

            for cls, conf in zip(classes, confidences):
                label = model.names[int(cls)]
                logging.debug(f"Detected label: {label}, Confidence: {conf}")

                # Check if the label is in the e-product categories
                if label.lower() in [category.lower() for category in E_PRODUCT_CATEGORIES] and conf > 0.3:
                    detected_e_product = True
                    break
            if detected_e_product:
                break

    logging.debug(f"E-Waste detected: {detected_e_product}")
    return detected_e_product
