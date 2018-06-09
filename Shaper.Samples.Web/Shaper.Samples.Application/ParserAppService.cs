using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;

namespace Shaper.Samples.Application
{
    //Ideally should be moved to a different layer i.e. Domain or DTO
    [DataContract]
    public class ShapeInfo
    {
        //below is intentionally string not Enum, it's up to Drawer(JS) to draw and decide what can be drawn
        [DataMember(Name = "shape")]
        public readonly string Shape;
        public string MeasureA => Measures.Keys.First();
        public int MeasureAValue => Measures[MeasureA];
        public string MeasureB => Measures.Count > 1 ? Measures.Keys.Last() : null;
        public int? MeasureBValue => MeasureB == null ? (int?) null : Measures[MeasureB];
        [DataMember(Name = "measures")]
        public readonly Dictionary<string, int> Measures;
        public ShapeInfo(string shape, string measureA, int measureAValue)
        {
            Shape = shape;
            Measures = new Dictionary<string, int>(2) {{measureA, measureAValue}};

            //MeasureA = measureA;
            //MeasureAValue = measureAValue;
            //MeasureB = measureB;
            //MeasureBValue = measureBValue;
        }
        public ShapeInfo(string shape, string measureA, int measureAValue, string measureB,
            int measureBValue) : this(shape, measureA, measureAValue)
        {
                Measures.Add(measureB, measureBValue);

            //MeasureA = measureA;
            //MeasureAValue = measureAValue;
            //MeasureB = measureB;
            //MeasureBValue = measureBValue;
        }

    }
    public class ParserAppService
    {
        //Keeping the regex expression compiled as static to avoid the repetitive overhead.
        private static readonly Regex ShapeRegex = new Regex(@"draw\s+a[n]?\s+([A-aZ-z\s]+)\s+with\s+a[n]?\s+([A-aZ-z\s]+)\s+of\s+(\d+)\s*(?>and\s+a[n]?\s+([a-zA-Z\s]+)\s+of\s*(\d+))?", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public ShapeInfo ParseShape(string value)
        {
            if (value == null) return null;
            var result = ShapeRegex.Match(value);
            if (!result.Success) return null;
            var shape = result.Groups[1].Value.Trim().ToLower();
            var measureA = result.Groups[2].Value.Trim().ToLower();
            var measureAVal = int.Parse(result.Groups[3].Value);

            //Regex returns 6 groups, as the first is the whole match
            if (!result.Groups[4].Success) return new ShapeInfo(shape, measureA, measureAVal);
            var measureB = result.Groups[4].Value.Trim().ToLower(); 
            int measureBVal = int.Parse(result.Groups[5].Value);

            return new ShapeInfo(shape, measureA, measureAVal, measureB, measureBVal);
        }

    }
}
