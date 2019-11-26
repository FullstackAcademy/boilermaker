"""Python wrappers around TensorFlow ops.

This file is MACHINE GENERATED! Do not edit.
Original C++ source file: tensor_forest_ops.cc
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


def tensor_forest_create_tree_variable(tree_handle, tree_config, name=None):
  r"""Creates a tree resource and returns a handle to it.

  Args:
    tree_handle: A `Tensor` of type `resource`.
      Handle to the tree resource to be created.
    tree_config: A `Tensor` of type `string`.
      Serialized proto string of the boosted_trees.Tree.
    name: A name for the operation (optional).

  Returns:
    The created Operation.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name,
        "TensorForestCreateTreeVariable", name, tld.op_callbacks, tree_handle,
        tree_config)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_create_tree_variable_eager_fallback(
            tree_handle, tree_config, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestCreateTreeVariable", tree_handle=tree_handle,
                                          tree_config=tree_config, name=name)
  return _op
TensorForestCreateTreeVariable = tf_export("raw_ops.TensorForestCreateTreeVariable")(_ops.to_raw_op(tensor_forest_create_tree_variable))


def tensor_forest_create_tree_variable_eager_fallback(tree_handle, tree_config, name, ctx):
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  tree_config = _ops.convert_to_tensor(tree_config, _dtypes.string)
  _inputs_flat = [tree_handle, tree_config]
  _attrs = None
  _result = _execute.execute(b"TensorForestCreateTreeVariable", 0,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  _result = None
  return _result


def tensor_forest_tree_deserialize(tree_handle, tree_config, name=None):
  r"""Deserializes a proto into the tree handle

  Args:
    tree_handle: A `Tensor` of type `resource`.
      Handle to the tree resource to be restored.
    tree_config: A `Tensor` of type `string`.
      Serialied proto string of the boosted_trees.Tree proto.
    name: A name for the operation (optional).

  Returns:
    The created Operation.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "TensorForestTreeDeserialize",
        name, tld.op_callbacks, tree_handle, tree_config)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_deserialize_eager_fallback(
            tree_handle, tree_config, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreeDeserialize", tree_handle=tree_handle,
                                       tree_config=tree_config, name=name)
  return _op
TensorForestTreeDeserialize = tf_export("raw_ops.TensorForestTreeDeserialize")(_ops.to_raw_op(tensor_forest_tree_deserialize))


def tensor_forest_tree_deserialize_eager_fallback(tree_handle, tree_config, name, ctx):
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  tree_config = _ops.convert_to_tensor(tree_config, _dtypes.string)
  _inputs_flat = [tree_handle, tree_config]
  _attrs = None
  _result = _execute.execute(b"TensorForestTreeDeserialize", 0,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  _result = None
  return _result


def tensor_forest_tree_is_initialized_op(tree_handle, name=None):
  r"""Checks whether a tree has been initialized.

  Args:
    tree_handle: A `Tensor` of type `resource`. Handle to the tree.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `bool`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name,
        "TensorForestTreeIsInitializedOp", name, tld.op_callbacks,
        tree_handle)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_is_initialized_op_eager_fallback(
            tree_handle, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreeIsInitializedOp", tree_handle=tree_handle, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ()
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "TensorForestTreeIsInitializedOp", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

TensorForestTreeIsInitializedOp = tf_export("raw_ops.TensorForestTreeIsInitializedOp")(_ops.to_raw_op(tensor_forest_tree_is_initialized_op))


def tensor_forest_tree_is_initialized_op_eager_fallback(tree_handle, name, ctx):
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  _inputs_flat = [tree_handle]
  _attrs = None
  _result = _execute.execute(b"TensorForestTreeIsInitializedOp", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "TensorForestTreeIsInitializedOp", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def tensor_forest_tree_predict(tree_handle, dense_features, logits_dimension, name=None):
  r"""Output the logits for the given input data

  Args:
    tree_handle: A `Tensor` of type `resource`. Handle to the tree resource.
    dense_features: A `Tensor` of type `float32`.
      Rank 2 dense features tensor.
    logits_dimension: An `int`. Scalar, dimension of the logits.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `float32`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "TensorForestTreePredict",
        name, tld.op_callbacks, tree_handle, dense_features,
        "logits_dimension", logits_dimension)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_predict_eager_fallback(
            tree_handle, dense_features, logits_dimension=logits_dimension,
            name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  logits_dimension = _execute.make_int(logits_dimension, "logits_dimension")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreePredict", tree_handle=tree_handle,
                                   dense_features=dense_features,
                                   logits_dimension=logits_dimension,
                                   name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("logits_dimension", _op._get_attr_int("logits_dimension"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "TensorForestTreePredict", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

TensorForestTreePredict = tf_export("raw_ops.TensorForestTreePredict")(_ops.to_raw_op(tensor_forest_tree_predict))


def tensor_forest_tree_predict_eager_fallback(tree_handle, dense_features, logits_dimension, name, ctx):
  logits_dimension = _execute.make_int(logits_dimension, "logits_dimension")
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  dense_features = _ops.convert_to_tensor(dense_features, _dtypes.float32)
  _inputs_flat = [tree_handle, dense_features]
  _attrs = ("logits_dimension", logits_dimension)
  _result = _execute.execute(b"TensorForestTreePredict", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "TensorForestTreePredict", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def tensor_forest_tree_resource_handle_op(container="", shared_name="", name=None):
  r"""Creates a handle to a TensorForestTreeResource

  Args:
    container: An optional `string`. Defaults to `""`.
    shared_name: An optional `string`. Defaults to `""`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `resource`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name,
        "TensorForestTreeResourceHandleOp", name, tld.op_callbacks,
        "container", container, "shared_name", shared_name)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_resource_handle_op_eager_fallback(
            container=container, shared_name=shared_name, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if container is None:
    container = ""
  container = _execute.make_str(container, "container")
  if shared_name is None:
    shared_name = ""
  shared_name = _execute.make_str(shared_name, "shared_name")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreeResourceHandleOp", container=container,
                                            shared_name=shared_name,
                                            name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("container", _op.get_attr("container"), "shared_name",
              _op.get_attr("shared_name"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "TensorForestTreeResourceHandleOp", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

TensorForestTreeResourceHandleOp = tf_export("raw_ops.TensorForestTreeResourceHandleOp")(_ops.to_raw_op(tensor_forest_tree_resource_handle_op))


def tensor_forest_tree_resource_handle_op_eager_fallback(container, shared_name, name, ctx):
  if container is None:
    container = ""
  container = _execute.make_str(container, "container")
  if shared_name is None:
    shared_name = ""
  shared_name = _execute.make_str(shared_name, "shared_name")
  _inputs_flat = []
  _attrs = ("container", container, "shared_name", shared_name)
  _result = _execute.execute(b"TensorForestTreeResourceHandleOp", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "TensorForestTreeResourceHandleOp", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def tensor_forest_tree_serialize(tree_handle, name=None):
  r"""Serializes the tree handle to a proto

  Args:
    tree_handle: A `Tensor` of type `resource`.
      Handle to the tree resource to be serialized.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `string`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "TensorForestTreeSerialize",
        name, tld.op_callbacks, tree_handle)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_serialize_eager_fallback(
            tree_handle, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreeSerialize", tree_handle=tree_handle, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ()
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "TensorForestTreeSerialize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

TensorForestTreeSerialize = tf_export("raw_ops.TensorForestTreeSerialize")(_ops.to_raw_op(tensor_forest_tree_serialize))


def tensor_forest_tree_serialize_eager_fallback(tree_handle, name, ctx):
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  _inputs_flat = [tree_handle]
  _attrs = None
  _result = _execute.execute(b"TensorForestTreeSerialize", 1,
                             inputs=_inputs_flat, attrs=_attrs, ctx=ctx,
                             name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "TensorForestTreeSerialize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def tensor_forest_tree_size(tree_handle, name=None):
  r"""Get the number of nodes in a tree

  Args:
    tree_handle: A `Tensor` of type `resource`. Handle to the tree resource.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `int32`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "TensorForestTreeSize", name,
        tld.op_callbacks, tree_handle)
      return _result
    except _core._FallbackException:
      try:
        return tensor_forest_tree_size_eager_fallback(
            tree_handle, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "TensorForestTreeSize", tree_handle=tree_handle, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ()
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "TensorForestTreeSize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

TensorForestTreeSize = tf_export("raw_ops.TensorForestTreeSize")(_ops.to_raw_op(tensor_forest_tree_size))


def tensor_forest_tree_size_eager_fallback(tree_handle, name, ctx):
  tree_handle = _ops.convert_to_tensor(tree_handle, _dtypes.resource)
  _inputs_flat = [tree_handle]
  _attrs = None
  _result = _execute.execute(b"TensorForestTreeSize", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "TensorForestTreeSize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

