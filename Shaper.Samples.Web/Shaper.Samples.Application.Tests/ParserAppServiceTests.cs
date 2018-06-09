using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Shaper.Samples.Application.Tests
{
    [TestClass]
    public class ParserAppService
    {
        [TestMethod]
        public void ParseShape_InvalidString_ReturnsNull()
        {
            //Arrange
            Application.ParserAppService svc = new Application.ParserAppService();
            var value = "Some nonesense with random 1000 numbers";

            //Act
            var result = svc.ParseShape(value);

            //Assert
            Assert.AreEqual(null, result);
        }

        [TestMethod]
        public void ParseShape_OneMeasure_ReturnsCorrectDetails()
        {
            //Arrange
            Application.ParserAppService svc = new Application.ParserAppService();
            var value = "DraW  a ciRcLe    with   a  Radius of  100";

            //Act
            var result = svc.ParseShape(value);

            //Assert
            Assert.AreNotEqual(null, result);
            Assert.AreEqual("circle", result.Shape);
            Assert.AreEqual("radius", result.MeasureA);
            Assert.AreEqual(100, result.MeasureAValue);
            Assert.AreEqual(null, result.MeasureB);
            Assert.AreEqual(null, result.MeasureBValue);
        }

        [TestMethod]
        public void ParseShape_TwoMeasures_ReturnsCorrectDetails()
        {
            //Arrange
            Application.ParserAppService svc = new Application.ParserAppService();
            var value = "Draw a rectangle with a width of 250 and a height of 400";

            //Act
            var result = svc.ParseShape(value);

            //Assert
            Assert.AreNotEqual(null, result);
            Assert.AreEqual("rectangle", result.Shape);
            Assert.AreEqual("width", result.MeasureA);
            Assert.AreEqual(250, result.MeasureAValue);
            Assert.AreEqual("height", result.MeasureB);
            Assert.AreEqual(400, result.MeasureBValue);
        }
    }
}
