"""Python wrappers around TensorFlow ops.

This file is MACHINE GENERATED! Do not edit.
Original C++ source file: stateless_random_ops.cc
"""

import collections

from tensorflow.python import pywrap_tensorflow as _pywrap_tensorflow
from tensorflow.python.eager import context as _context
from tensorflow.python.eager import core as _core
from tensorflow.python.eager import execute as _execute
from tensorflow.python.framework import dtypes as _dtypes

from tensorflow.python.framework import op_def_registry as _op_def_registry
from tensorflow.python.framework import ops as _ops
from tensorflow.python.framework import op_def_library as _op_def_library
from tensorflow.python.util.deprecation import deprecated_endpoints
from tensorflow.python.util import dispatch as _dispatch
from tensorflow.python.util.tf_export import tf_export


def stateless_multinomial(logits, num_samples, seed, output_dtype=_dtypes.int64, name=None):
  r"""Draws samples from a multinomial distribution.

  Args:
    logits: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `int64`, `bfloat16`, `uint16`, `half`, `uint32`, `uint64`.
      2-D Tensor with shape `[batch_size, num_classes]`.  Each slice `[i, :]`
      represents the unnormalized log probabilities for all classes.
    num_samples: A `Tensor` of type `int32`.
      0-D.  Number of independent samples to draw for each row slice.
    seed: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      2 seeds (shape [2]).
    output_dtype: An optional `tf.DType` from: `tf.int32, tf.int64`. Defaults to `tf.int64`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `output_dtype`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "StatelessMultinomial", name,
        tld.op_callbacks, logits, num_samples, seed, "output_dtype",
        output_dtype)
      return _result
    except _core._FallbackException:
      try:
        return stateless_multinomial_eager_fallback(
            logits, num_samples, seed, output_dtype=output_dtype, name=name,
            ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if output_dtype is None:
    output_dtype = _dtypes.int64
  output_dtype = _execute.make_type(output_dtype, "output_dtype")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "StatelessMultinomial", logits=logits, num_samples=num_samples,
                                seed=seed, output_dtype=output_dtype,
                                name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tseed",
              _op._get_attr_type("Tseed"), "output_dtype",
              _op._get_attr_type("output_dtype"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "StatelessMultinomial", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

StatelessMultinomial = tf_export("raw_ops.StatelessMultinomial")(_ops.to_raw_op(stateless_multinomial))


def stateless_multinomial_eager_fallback(logits, num_samples, seed, output_dtype, name, ctx):
  if output_dtype is None:
    output_dtype = _dtypes.int64
  output_dtype = _execute.make_type(output_dtype, "output_dtype")
  _attr_T, (logits,) = _execute.args_to_matching_eager([logits], ctx)
  _attr_Tseed, (seed,) = _execute.args_to_matching_eager([seed], ctx, _dtypes.int64)
  num_samples = _ops.convert_to_tensor(num_samples, _dtypes.int32)
  _inputs_flat = [logits, num_samples, seed]
  _attrs = ("T", _attr_T, "Tseed", _attr_Tseed, "output_dtype", output_dtype)
  _result = _execute.execute(b"StatelessMultinomial", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "StatelessMultinomial", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def stateless_random_normal(shape, seed, dtype=_dtypes.float32, name=None):
  r"""Outputs deterministic pseudorandom values from a normal distribution.

  The generated values will have mean 0 and standard deviation 1.

  The outputs are a deterministic function of `shape` and `seed`.

  Args:
    shape: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      The shape of the output tensor.
    seed: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      2 seeds (shape [2]).
    dtype: An optional `tf.DType` from: `tf.half, tf.bfloat16, tf.float32, tf.float64`. Defaults to `tf.float32`.
      The type of the output.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `dtype`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "StatelessRandomNormal", name,
        tld.op_callbacks, shape, seed, "dtype", dtype)
      return _result
    except _core._FallbackException:
      try:
        return stateless_random_normal_eager_fallback(
            shape, seed, dtype=dtype, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "StatelessRandomNormal", shape=shape, seed=seed, dtype=dtype,
                                 name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("dtype", _op._get_attr_type("dtype"), "T",
              _op._get_attr_type("T"), "Tseed", _op._get_attr_type("Tseed"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "StatelessRandomNormal", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

StatelessRandomNormal = tf_export("raw_ops.StatelessRandomNormal")(_ops.to_raw_op(stateless_random_normal))


def stateless_random_normal_eager_fallback(shape, seed, dtype, name, ctx):
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _attr_T, (shape,) = _execute.args_to_matching_eager([shape], ctx, _dtypes.int32)
  _attr_Tseed, (seed,) = _execute.args_to_matching_eager([seed], ctx, _dtypes.int64)
  _inputs_flat = [shape, seed]
  _attrs = ("dtype", dtype, "T", _attr_T, "Tseed", _attr_Tseed)
  _result = _execute.execute(b"StatelessRandomNormal", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "StatelessRandomNormal", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def stateless_random_uniform(shape, seed, dtype=_dtypes.float32, name=None):
  r"""Outputs deterministic pseudorandom random values from a uniform distribution.

  The generated values follow a uniform distribution in the range `[0, 1)`. The
  lower bound 0 is included in the range, while the upper bound 1 is excluded.

  The outputs are a deterministic function of `shape` and `seed`.

  Args:
    shape: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      The shape of the output tensor.
    seed: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      2 seeds (shape [2]).
    dtype: An optional `tf.DType` from: `tf.half, tf.bfloat16, tf.float32, tf.float64`. Defaults to `tf.float32`.
      The type of the output.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `dtype`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "StatelessRandomUniform", name,
        tld.op_callbacks, shape, seed, "dtype", dtype)
      return _result
    except _core._FallbackException:
      try:
        return stateless_random_uniform_eager_fallback(
            shape, seed, dtype=dtype, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "StatelessRandomUniform", shape=shape, seed=seed, dtype=dtype,
                                  name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("dtype", _op._get_attr_type("dtype"), "T",
              _op._get_attr_type("T"), "Tseed", _op._get_attr_type("Tseed"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "StatelessRandomUniform", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

StatelessRandomUniform = tf_export("raw_ops.StatelessRandomUniform")(_ops.to_raw_op(stateless_random_uniform))


def stateless_random_uniform_eager_fallback(shape, seed, dtype, name, ctx):
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _attr_T, (shape,) = _execute.args_to_matching_eager([shape], ctx, _dtypes.int32)
  _attr_Tseed, (seed,) = _execute.args_to_matching_eager([seed], ctx, _dtypes.int64)
  _inputs_flat = [shape, seed]
  _attrs = ("dtype", dtype, "T", _attr_T, "Tseed", _attr_Tseed)
  _result = _execute.execute(b"StatelessRandomUniform", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "StatelessRandomUniform", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def stateless_random_uniform_int(shape, seed, minval, maxval, name=None):
  r"""Outputs deterministic pseudorandom random integers from a uniform distribution.

  The generated values follow a uniform distribution in the range `[minval, maxval)`.

  The outputs are a deterministic function of `shape`, `seed`, `minval`, and `maxval`.

  Args:
    shape: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      The shape of the output tensor.
    seed: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      2 seeds (shape [2]).
    minval: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      Minimum value (inclusive, scalar).
    maxval: A `Tensor`. Must have the same type as `minval`.
      Maximum value (exclusive, scalar).
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `minval`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "StatelessRandomUniformInt",
        name, tld.op_callbacks, shape, seed, minval, maxval)
      return _result
    except _core._FallbackException:
      try:
        return stateless_random_uniform_int_eager_fallback(
            shape, seed, minval, maxval, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "StatelessRandomUniformInt", shape=shape, seed=seed, minval=minval,
                                     maxval=maxval, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("dtype", _op._get_attr_type("dtype"), "T",
              _op._get_attr_type("T"), "Tseed", _op._get_attr_type("Tseed"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "StatelessRandomUniformInt", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

StatelessRandomUniformInt = tf_export("raw_ops.StatelessRandomUniformInt")(_ops.to_raw_op(stateless_random_uniform_int))


def stateless_random_uniform_int_eager_fallback(shape, seed, minval, maxval, name, ctx):
  _attr_dtype, _inputs_dtype = _execute.args_to_matching_eager([minval, maxval], ctx)
  (minval, maxval) = _inputs_dtype
  _attr_T, (shape,) = _execute.args_to_matching_eager([shape], ctx)
  _attr_Tseed, (seed,) = _execute.args_to_matching_eager([seed], ctx, _dtypes.int64)
  _inputs_flat = [shape, seed, minval, maxval]
  _attrs = ("dtype", _attr_dtype, "T", _attr_T, "Tseed", _attr_Tseed)
  _result = _execute.execute(b"StatelessRandomUniformInt", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "StatelessRandomUniformInt", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def stateless_truncated_normal(shape, seed, dtype=_dtypes.float32, name=None):
  r"""Outputs deterministic pseudorandom values from a truncated normal distribution.

  The generated values follow a normal distribution with mean 0 and standard
  deviation 1, except that values whose magnitude is more than 2 standard
  deviations from the mean are dropped and re-picked.

  The outputs are a deterministic function of `shape` and `seed`.

  Args:
    shape: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      The shape of the output tensor.
    seed: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      2 seeds (shape [2]).
    dtype: An optional `tf.DType` from: `tf.half, tf.bfloat16, tf.float32, tf.float64`. Defaults to `tf.float32`.
      The type of the output.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `dtype`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "StatelessTruncatedNormal",
        name, tld.op_callbacks, shape, seed, "dtype", dtype)
      return _result
    except _core._FallbackException:
      try:
        return stateless_truncated_normal_eager_fallback(
            shape, seed, dtype=dtype, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "StatelessTruncatedNormal", shape=shape, seed=seed, dtype=dtype,
                                    name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("dtype", _op._get_attr_type("dtype"), "T",
              _op._get_attr_type("T"), "Tseed", _op._get_attr_type("Tseed"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "StatelessTruncatedNormal", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

StatelessTruncatedNormal = tf_export("raw_ops.StatelessTruncatedNormal")(_ops.to_raw_op(stateless_truncated_normal))


def stateless_truncated_normal_eager_fallback(shape, seed, dtype, name, ctx):
  if dtype is None:
    dtype = _dtypes.float32
  dtype = _execute.make_type(dtype, "dtype")
  _attr_T, (shape,) = _execute.args_to_matching_eager([shape], ctx, _dtypes.int32)
  _attr_Tseed, (seed,) = _execute.args_to_matching_eager([seed], ctx, _dtypes.int64)
  _inputs_flat = [shape, seed]
  _attrs = ("dtype", dtype, "T", _attr_T, "Tseed", _attr_Tseed)
  _result = _execute.execute(b"StatelessTruncatedNormal", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "StatelessTruncatedNormal", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

