import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setScale(1);
    setFlipX(false);
    setFlipY(false);
  };

  const getImageStyle = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
      transform: `rotate(${rotation}deg) scale(${scale}) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
      transition: 'all 0.3s ease',
      maxWidth: '100%',
      maxHeight: '400px',
      objectFit: 'contain'
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Decipher
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {image && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Image Preview</h2>
          <div className="flex justify-center bg-gray-100 rounded-lg p-4 min-h-[300px] items-center">
            <img
              src={image}
              alt="Uploaded"
              style={getImageStyle()}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}

      {image && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Image Controls</h2>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contrast: {contrast}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saturation: {saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rotation: {rotation}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale: {scale}x
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Flip Options</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flipX}
                    onChange={(e) => setFlipX(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Flip X</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flipY}
                    onChange={(e) => setFlipY(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Flip Y</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Presets</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setBrightness(120);
                  setContrast(110);
                  setSaturation(90);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Enhance
              </button>
              <button
                onClick={() => {
                  setBrightness(80);
                  setContrast(120);
                  setSaturation(70);
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Vintage
              </button>
              <button
                onClick={() => {
                  setBrightness(100);
                  setContrast(100);
                  setSaturation(0);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Grayscale
              </button>
              <button
                onClick={() => {
                  setBrightness(110);
                  setContrast(90);
                  setSaturation(120);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Vibrant
              </button>
            </div>
          </div>
        </div>
      )}

      {!image && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            Upload a manuscript image to view and manipulate it with various filters and transformations.
          </p>
        </div>
      )}
    </div>
  );
}

export default App