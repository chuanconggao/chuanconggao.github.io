#! /usr/bin/env python3

import sys
import os

import jinja2

path, filename = os.path.split(sys.argv[1])

print(
    jinja2.Environment(
        loader=jinja2.FileSystemLoader(path)
    ).get_template(filename).render()
)
