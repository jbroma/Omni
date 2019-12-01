from io import BytesIO
from os import path

from PIL import Image

from django.core.files.base import ContentFile


class EmailNotUniqueError(Exception):
    """Raise when provided email is already in use"""


def make_thumbnail(dst_field, src_field, size, name_suffix, sep='_'):
    """Create thumbnail of an image from source image field"""
    image = Image.open(src_field)
    image.thumbnail(size, Image.ANTIALIAS)

    dst_path, dst_ext = path.splitext(src_field.name)
    dst_ext = dst_ext.lower()
    dst_fname = dst_path + sep + name_suffix + dst_ext

    if dst_ext in ['.jpg', '.jpeg']:
        filetype = 'JPEG'
    elif dst_ext == '.gif':
        filetype = 'GIF'
    elif dst_ext == '.png':
        filetype = 'PNG'
    else:
        raise RuntimeError('unrecognized file type of "%s"' % dst_ext)

    dst_bytes = BytesIO()
    image.save(dst_bytes, filetype)
    dst_bytes.seek(0)

    dst_field.save(dst_fname, ContentFile(dst_bytes.read()), save=False)
    dst_bytes.close()
