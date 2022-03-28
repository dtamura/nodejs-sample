const tracer = require("dd-trace").init({
  tags: {
    domain: "common",
  },
});
// tracer.use('http', {
//   blocklist: ["/healthz"]
// });

tracer.use('express', {
  // hook will be executed right before the request span is finished
  hooks: {
    request: (span, req, res) => {
      span.setTag('product', 'sample');
    }
  }
})

module.exports = tracer;
