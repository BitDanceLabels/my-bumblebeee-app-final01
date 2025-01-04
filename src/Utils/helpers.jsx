// import React from "react";
// export function createName_Blob(blob) {
//   // Get the current date and time
//   var date = new Date();
//   // Get the year, month, day, hour, minute, second, and millisecond
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   var day = date.getDate();
//   var hour = date.getHours();
//   var minute = date.getMinutes();
//   var second = date.getSeconds();
//   var millisecond = date.getMilliseconds();
//   // Generate a random number between 0 and 9999
//   var random = Math.floor(Math.random() * 10000);
//   // Combine the date, time, and random number with dashes
//   var name =
//     year +
//     "_" +
//     month +
//     "_" +
//     day +
//     "_" +
//     hour +
//     "_" +
//     minute +
//     "_" +
//     second +
//     "_" +
//     millisecond +
//     "_" +
//     random;
//   // Get the extension from the blob's type
//   var extension = blob.type.split("/")[1];
//   // Add the extension to the name
//   name += "." + extension;
//   // Return the name
//   return name;
// }
// export function blobToFile(blob) {
//   console.log(blob)
//   var file = new File([blob], createName_Blob(blob), {
//     type: blob.type,
//     lastModified: Date.now(),
//   });
//   return file;
// }
// function isValidFileUrl(url) {
//   // Regular expression for a basic URL validation
//   const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

//   // Test if the provided URL matches the pattern
//   return urlPattern.test(url);
// }
// export function getFileFromUrl(url) {
//   return new Promise((resolve, reject) => {
//     if (!isValidFileUrl(url)) reject(`URL not valid, ${url}`);
//     fetch(url)
//       .then((response) => response.blob())
//       .then((blob) => {
//         // You can also use URL.createObjectURL(blob) to create a temporary URL for the blob
//         resolve(blobToFile(blob));
//       })
//       .catch((error) => {
//         console.error(error);
//         reject(error);
//       });
//   });
// }

import React from "react";

export function createName_Blob(blob) {
  const date = new Date();
  const name = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}_${Math.floor(Math.random() * 10000)}`;
  const extension = blob.type && blob.type.includes("/") ? blob.type.split("/")[1] : "unknown";
  return `${name}.${extension}`;
}

export function blobToFile(blob) {
  console.log("Converting blob to file:", blob);
  return new File([blob], createName_Blob(blob), {
    type: blob.type,
    lastModified: Date.now(),
  });
}

function isValidFileUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getFileFromUrl(url) {
  return new Promise((resolve, reject) => {
    if (!isValidFileUrl(url)) {
      reject(new Error(`Invalid URL: ${url}`));
      return;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const file = blobToFile(blob);
        console.log("File created from blob:", file);
        resolve(file);
      })
      .catch((error) => {
        console.error("Error fetching or processing the file:", error);
        reject(error);
      });
  });
}