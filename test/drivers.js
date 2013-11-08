"use strict"
var test = require('tap').test
var fs = require('fs')
var ogr2ogr = require('../')
var dir = __dirname+'/samples/'
var sampleGeoJSONUrl = "https://gist.github.com/wavded/7376428/raw/971548233e441615a426794c766223488492ddb9/test.geojson"

test('ESRI Shapefile', function (t) {
  t.plan(4)

  ogr2ogr(dir+'sample.shp.zip').format('ESRI Shapefile').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.equal(buf[0], 80, 'in zip format')
      t.ok(buf.length > 40, 'is not empty zip')
    }
  })
})

test('MapInfo File', function (t) {
  t.plan(4)

  ogr2ogr(dir+'sample.map.zip').format('MapInfo File').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.equal(buf[0], 80, 'in zip format')
      t.ok(buf.length > 40, 'is not empty zip')
    }
  })
})

test('TIGER', function (t) {
  t.plan(4)

  ogr2ogr(dir+'sample.rti.zip').format('TIGER').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.equal(buf[0], 80, 'in zip format')
      t.ok(buf.length > 40, 'is not empty zip')
    }
  })
})

test('GeoJSON', function (t) {
  t.plan(4)

  ogr2ogr(dir+'sample.geojson').format('GeoJSON').exec(function (er, data) {
    t.notOk(er, 'no error', { error: er })
    t.equal(data && data.type, 'FeatureCollection', 'is GeoJSON data')
  })

  ogr2ogr(sampleGeoJSONUrl).format('GeoJSON').exec(function (er, data) {
    t.notOk(er, 'no error', { error: er })
    t.equal(data && data.type, 'FeatureCollection', 'is GeoJSON data')
  })
})

test('KML', function (t) {
  t.plan(6)

  ogr2ogr(dir+'sample.kml').format('KML').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.notEqual(buf[0], 80, 'not in zip format')
    }
  })

  ogr2ogr(dir+'sample.kmz').format('KML').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.notEqual(buf[0], 80, 'not in zip format')
    }
  })
})

test('CSV', function (t) {
  t.plan(9)

  ogr2ogr(dir+'sample-nogeom.csv').format('GeoJSON').exec(function (er, data) {
    t.notOk(er, 'no error', { error: er })
    t.equal(data && data.features[0].geometry, null, 'no spatial data')
  })

  ogr2ogr(dir+'sample.csv').format('GeoJSON').exec(function (er, data) {
    t.notOk(er, 'no error', { error: er })
    t.ok(data && data.features[0].geometry, 'spatial data')
  })

  ogr2ogr(dir+'sample-geom.csv').format('GeoJSON').exec(function (er, data) {
    t.notOk(er, 'no error', { error: er })
    t.ok(data && data.features[0].geometry, 'spatial data')
  })

  ogr2ogr(dir+'sample.csv').format('CSV').exec(function (er, buf) {
    t.notOk(er, 'no error', { error: er })

    if (buf) {
      t.ok(Buffer.isBuffer(buf), 'is buffer')
      t.notEqual(buf[0], 80, 'not in zip format')
    }
  })
})
